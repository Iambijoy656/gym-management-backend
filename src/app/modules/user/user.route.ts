import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
    '/create-trainee',
    validateRequest(UserValidation.createTraineeZodSchema),
    UserController.createTrainee
);
router.post(
    '/create-trainer',
    validateRequest(UserValidation.createTrainerZodSchema),
    UserController.createTrainer
);

router.post(
    '/create-admin',
    validateRequest(UserValidation.createAdminZodSchema),
    UserController.createAdmin
);

export const UserRoutes = router;
