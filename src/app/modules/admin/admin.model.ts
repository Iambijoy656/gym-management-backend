import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

const AdminSchema = new Schema<IAdmin, AdminModel>(
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
            unique: true

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

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
