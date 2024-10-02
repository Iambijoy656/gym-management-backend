/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder, FilterQuery } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { traineeSearchableFields } from './trainee.constant';
import { ITrainee, ITraineeFilters } from './trainee.interface';
import { Trainee } from './trainee.model';
import { paginationHelper } from '../../../helpers/paginationHelper';



const getAllTrainees = async (
    filters: ITraineeFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITrainee[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelper.calculatePaginations(paginationOptions);

    const andConditions: FilterQuery<ITrainee>[] = [];

    // Search term condition
    if (searchTerm) {
        andConditions.push({
            $or: traineeSearchableFields.map(field => ({
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


    const result = await Trainee.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Trainee.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleTrainee = async (id: string): Promise<ITrainee | null> => {
    const result = await Trainee.findOne({ id }).populate('ManagementDepartment');
    return result;
};

const updateTrainee = async (
    id: string,
    payload: Partial<ITrainee>
): Promise<ITrainee | null> => {
    const isExist = await Trainee.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Trainee not found !');
    }

    const { name, ...traineeData } = payload;

    const updatedStudentData: Partial<ITrainee> = { ...traineeData };

    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}` as keyof Partial<ITrainee>;
            (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
        });
    }

    const result = await Trainee.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
};

const deleteTrainee = async (id: string): Promise<ITrainee | null> => {
    // check if the faculty is exist
    const isExist = await Trainee.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //delete trainee first
        const trainee = await Trainee.findOneAndDelete({ id }, { session });
        if (!trainee) {
            throw new ApiError(404, 'Failed to delete trainee');
        }
        //delete user
        await User.deleteOne({ id });
        session.commitTransaction();
        session.endSession();

        return trainee;
    } catch (error) {
        session.abortTransaction();
        throw error;
    }
};

export const TraineeService = {
    getAllTrainees,
    getSingleTrainee,
    updateTrainee,
    deleteTrainee,
};
