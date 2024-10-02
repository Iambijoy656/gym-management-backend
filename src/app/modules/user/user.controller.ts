import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createTrainee: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        // console.log(req.cookies, 'cookies');
        const { trainee, ...userData } = req.body;
        const result = await UserService.createTrainee(trainee, userData);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User is created successfully',
            data: result,
        });
    }
);

const createTrainer: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { trainer, ...userData } = req.body;
        const result = await UserService.createTrainer(trainer, userData);

        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Trainer created successfully!',
            data: result,
        });
    }
);

const createAdmin: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { admin, ...userData } = req.body;
        const result = await UserService.createAdmin(admin, userData);

        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Admin created successfully!',
            data: result,
        });
    }
);

export const UserController = {
    createTrainee,
    createTrainer,
    createAdmin,
};
