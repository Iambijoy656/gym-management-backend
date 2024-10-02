import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { ITrainer } from '../trainer/trainer.interface';
import { ITrainee } from '../trainee/trainee.interface';

export type IUser = {
    id: string;
    role: string;
    password: string;
    needsPasswordChange: true | false;
    passwordChangeAt?: Date;
    trainee?: Types.ObjectId | ITrainee;
    trainer?: Types.ObjectId | ITrainer;
    admin?: Types.ObjectId | IAdmin;
};

// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser>|null>;
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// }

export type UserModel = {
    isUserExist(
        id: string
    ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
