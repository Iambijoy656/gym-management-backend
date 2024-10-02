import { Schema, model } from 'mongoose';
import { TrainerModel, ITrainer } from './trainer.interface';

const TrainerSchema = new Schema<ITrainer, TrainerModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: {
                firstName: {
                    type: String,
                    required: true,
                },
                lastName: {
                    type: String,
                    required: true,
                },
                middleName: {
                    type: String,
                    required: false,
                },
            },
            required: true,
        },
        dateOfBirth: {
            type: String,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
        },
        bloodGroup: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        contactNo: {
            type: String,
            unique: true,

        },
        emergencyContactNo: {
            type: String,

        },
        presentAddress: {
            type: String,

        },
        permanentAddress: {
            type: String,

        },
        designation: {
            type: String,

        },
        profileImage: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Trainer = model<ITrainer, TrainerModel>('Trainer', TrainerSchema);
