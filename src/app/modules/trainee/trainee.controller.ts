import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ITrainee } from './trainee.interface';
import { TraineeService } from './trainee.service';
import { traineeFilterableFields } from './trainee.constant';

const getAllTrainees = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, traineeFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await TraineeService.getAllTrainees(filters, paginationOptions);

    sendResponse<ITrainee[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Trainees retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleTrainee = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TraineeService.getSingleTrainee(id);

    sendResponse<ITrainee>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Trainee retrieved successfully !',
        data: result,
    });
});

const updateTrainee = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await TraineeService.updateTrainee(id, updatedData);

    sendResponse<ITrainee>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Trainee updated successfully !',
        data: result,
    });
});
const deleteTrainee = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await TraineeService.deleteTrainee(id);

    sendResponse<ITrainee>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Trainee deleted successfully !',
        data: result,
    });
});

export const TraineeController = {
    getAllTrainees,
    getSingleTrainee,
    updateTrainee,
    deleteTrainee,
};
