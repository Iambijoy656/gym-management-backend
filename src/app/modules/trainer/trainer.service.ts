/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder, FilterQuery } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { trainerSearchableFields } from './trainer.constant';
import { ITrainer, ITrainerFilters } from './trainer.interface';
import { Trainer } from './trainer.model';
import { paginationHelper } from '../../../helpers/paginationHelper';



const getAllTrainers = async (
    filters: ITrainerFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITrainer[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelper.calculatePaginations(paginationOptions);

    const andConditions: FilterQuery<ITrainer>[] = [];

    // Search term condition
    if (searchTerm) {
        andConditions.push({
            $or: trainerSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    // Additional filters
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};


    const result = await Trainer.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Trainer.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleTrainer = async (id: string): Promise<ITrainer | null> => {
    const result = await Trainer.findOne({ id }).populate('ManagementDepartment');
    return result;
};

const updateTrainer = async (
    id: string,
    payload: Partial<ITrainer>
): Promise<ITrainer | null> => {
    const isExist = await Trainer.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Trainer not found !');
    }

    const { name, ...trainerData } = payload;

    const updatedStudentData: Partial<ITrainer> = { ...trainerData };

    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}` as keyof Partial<ITrainer>;
            (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
        });
    }

    const result = await Trainer.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
};

const deleteTrainer = async (id: string): Promise<ITrainer | null> => {
    // check if the faculty is exist
    const isExist = await Trainer.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //delete trainer first
        const trainer = await Trainer.findOneAndDelete({ id }, { session });
        if (!trainer) {
            throw new ApiError(404, 'Failed to delete trainer');
        }
        //delete user
        await User.deleteOne({ id });
        session.commitTransaction();
        session.endSession();

        return trainer;
    } catch (error) {
        session.abortTransaction();
        throw error;
    }
};

export const TrainerService = {
    getAllTrainers,
    getSingleTrainer,
    updateTrainer,
    deleteTrainer,
};
