
import { User } from './user.model';

// Trainee ID
export const findLastTraineeId = async (): Promise<string | undefined> => {
    const lastTrainee = await User.findOne(
        {
            role: 'trainee',
        },
        { id: 1, _id: 0 }
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastTrainee?.id ? lastTrainee.id.substring(4) : undefined;
};

export const generateTraineeId = async (
): Promise<string> => {
    const currentId =
        (await findLastTraineeId()) || (0).toString().padStart(5, '0'); //00000
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');


    return incrementedId;
};

// Trainer ID
export const findLastTrainerId = async (): Promise<string | undefined> => {
    const lastTrainer = await User.findOne({ role: 'trainer' }, { id: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastTrainer?.id ? lastTrainer.id.substring(2) : undefined;
};

export const generateTrainerId = async (): Promise<string> => {
    const currentId =
        (await findLastTrainerId()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `T-${incrementedId}`;

    return incrementedId;
};

// Admin ID
export const findLastAdminId = async (): Promise<string | undefined> => {
    const lastTrainer = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastTrainer?.id ? lastTrainer.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
    const currentId =
        (await findLastAdminId()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `A-${incrementedId}`;

    return incrementedId;
};
