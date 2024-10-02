import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { ITrainer } from '../trainer/trainer.interface';
import { Trainer } from '../trainer/trainer.model';
import { ITrainee } from '../trainee/trainee.interface';
import { Trainee } from '../trainee/trainee.model';
import { IUser } from './user.interface';
import { User } from './user.model';



const createTrainee = async (
    trainee: ITrainee,
    user: IUser
): Promise<IUser | null> => {
    // If password is not given,set default password
    // if (!user.password) {
    //     user.password = config.default_trainee_pass as string;
    // }

    // set role
    user.role = 'trainee';


    let newUserAllData = null;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // generate trainee id
        // const id = await generateTraineeId();
        // set custom id into both  trainee & user
        // user.id = id;
        // trainee.id = id;

        // Create trainee using sesssin
        const newTrainee = await Trainee.create([trainee], { session });

        if (!newTrainee.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create trainee');
        }

        // set trainee _id (reference) into user.trainee
        user.trainee = newTrainee[0]._id;

        const newUser = await User.create([user], { session });

        if (!newUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    if (newUserAllData) {
        newUserAllData = await User.findOne({ _id: newUserAllData._id })
    }
    console.log('newUserAllData', newUserAllData);
    return newUserAllData;
};

const createTrainer = async (
    trainer: ITrainer,
    user: IUser
): Promise<IUser | null> => {
    // If password is not given,set default password
    if (!user.password) {
        user.password = config.default_trainer_pass as string;
    }

    // set role
    user.role = 'trainer';

    let newUserAllData = null;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // generate trainer id
        // const id = await generateTrainerId();
        // // set custom id into both  trainer & user
        // user.id = id;
        // trainer.id = id;
        // Create trainer using sesssin
        const newTrainer = await Trainer.create([trainer], { session });

        if (!newTrainer.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create trainer ');
        }
        // set trainer _id (reference) into user.trainee
        user.trainer = newTrainer[0]._id;

        const newUser = await User.create([user], { session });

        if (!newUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create trainer');
        }
        newUserAllData = newUser[0];

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    if (newUserAllData) {
        newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
            path: 'trainer',
            populate: [
                {
                    path: 'academicDepartment',
                },
                {
                    path: 'academicTrainer',
                },
            ],
        });
    }

    return newUserAllData;
};

const createAdmin = async (
    admin: IAdmin,
    user: IUser
): Promise<IUser | null> => {
    // If password is not given,set default password
    if (!user.password) {
        user.password = config.default_admin_pass as string;
    }
    // set role
    user.role = 'admin';

    let newUserAllData = null;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // generate admin id
        // const id = await generateAdminId();
        // user.id = id;
        // admin.id = id;

        const newAdmin = await Admin.create([admin], { session });

        if (!newAdmin.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create trainer ');
        }

        user.admin = newAdmin[0]._id;

        const newUser = await User.create([user], { session });

        if (!newUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }
        newUserAllData = newUser[0];

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    if (newUserAllData) {
        newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
            path: 'admin',
            populate: [
                {
                    path: 'managementDepartment',
                },
            ],
        });
    }

    return newUserAllData;
};

export const UserService = {
    createTrainee,
    createTrainer,
    createAdmin,
};
