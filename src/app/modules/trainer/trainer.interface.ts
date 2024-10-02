import { Model, Types } from 'mongoose';

export type UserName = {
    firstName: string;
    lastName: string;
    middleName: string;
};

export type ITrainer = {
    id: string;
    name: UserName;
    profileImage: string;
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    gender?: 'male' | 'female';
    permanentAddress?: string;
    presentAddress?: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    designation: string;
};

export type TrainerModel = Model<ITrainer, Record<string, unknown>>;

export type ITrainerFilters = {
    searchTerm?: string;
    id?: string;
    email?: string;
    contactNo?: string;
    emergencyContactNo?: string;
    gender?: 'male' | 'female';
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    designation?: string;
};
