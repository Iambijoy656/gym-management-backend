import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TrainerController } from './trainer.controller';
import { TrainerValidation } from './trainer.validation';
const router = express.Router();

router.get('/:id', TrainerController.getSingleTrainer);
router.get('/', TrainerController.getAllTrainers);

router.delete('/:id', TrainerController.deleteTrainer);

router.patch(
    '/:id',
    validateRequest(TrainerValidation.updateTrainer),
    TrainerController.updateTrainer
);

export const TrainerRoutes = router;
