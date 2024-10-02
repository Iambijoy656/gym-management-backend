import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ITrainer } from './trainer.interface';
import { TrainerService } from './trainer.service';
import { trainerFilterableFields } from './trainer.constant';

const getAllTrainers = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, trainerFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await TrainerService.getAllTrainers(filters, paginationOptions);

    sendResponse<ITrainer[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Trainers retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleTrainer = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TrainerService.getSingleTrainer(id);

    sendResponse<ITrainer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Trainer retrieved successfully !',
        data: result,
    });
});

const updateTrainer = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await TrainerService.updateTrainer(id, updatedData);

    sendResponse<ITrainer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Trainer updated successfully !',
        data: result,
    });
});
const deleteTrainer = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await TrainerService.deleteTrainer(id);

    sendResponse<ITrainer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Trainer deleted successfully !',
        data: result,
    });
});

export const TrainerController = {
    getAllTrainers,
    getSingleTrainer,
    updateTrainer,
    deleteTrainer,
};
