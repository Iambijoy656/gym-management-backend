import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TraineeController } from './trainee.controller';
import { TraineeValidation } from './trainee.validation';
const router = express.Router();

router.get('/:id', TraineeController.getSingleTrainee);
router.get('/', TraineeController.getAllTrainees);

router.delete('/:id', TraineeController.deleteTrainee);

router.patch(
    '/:id',
    validateRequest(TraineeValidation.updateTrainee),
    TraineeController.updateTrainee
);

export const TraineeRoutes = router;
