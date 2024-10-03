import { Schema, model } from 'mongoose';
import { TraineeModel, ITrainee } from './trainee.interface';

const TraineeSchema = new Schema<ITrainee, TraineeModel>(
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

export const Trainee = model<ITrainee, TraineeModel>('Trainee', TraineeSchema);
