import { z } from 'zod';
import { bloodGroup, gender } from '../trainee/trainee.constant';

const createTraineeZodSchema = z.object({
    body: z.object({
        password: z.string().optional(),

        trainee: z.object({
            name: z.object({
                firstName: z.string({
                    required_error: 'First name is required',
                }),
                lastName: z.string({
                    required_error: 'Last name is required',
                }),
                middleName: z.string().optional(),
            }),
            gender: z.enum([...gender] as [string, ...string[]]).optional(),
            dateOfBirth: z.string({
                required_error: 'Date of birth is required',
            }).optional(),
            email: z
                .string({
                    required_error: 'Email is required',
                })
                .email(),
            contactNo: z.string({
                required_error: 'Contact number is required',
            }).optional(),
            bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
            profileImage: z.string().optional(),
        }),
    }),
});

const createTrainerZodSchema = z.object({
    body: z.object({
        password: z.string().optional(),

        trainer: z.object({
            name: z.object({
                firstName: z.string({
                    required_error: 'First name is required',
                }),
                lastName: z.string({
                    required_error: 'Last name is required',
                }),
                middleName: z.string().optional(),
            }),
            gender: z.string({
                required_error: 'Gender is required',
            }).optional(),
            dateOfBirth: z.string({
                required_error: 'Date of birth is required',
            }).optional(),
            email: z
                .string({
                    required_error: 'Email is required',
                })
                .email(),
            contactNo: z.string({
                required_error: 'Contact number is required',
            }).optional(),
            emergencyContactNo: z.string({
                required_error: 'Emergency contact number is required',
            }).optional(),
            bloodGroup: z
                .string({
                    required_error: 'Blood group is required',
                })
                .optional(),
            presentAddress: z.string({
                required_error: 'Present address is required',
            }).optional(),
            designation: z.string({
                required_error: 'Designation is required',
            }).optional(),
            profileImage: z.string().optional(),
        }),
    }),
});

const createAdminZodSchema = z.object({
    body: z.object({
        password: z.string().optional(),

        admin: z.object({
            name: z.object({
                firstName: z.string({
                    required_error: 'First name is required',
                }),
                lastName: z.string({
                    required_error: 'Last name is required',
                }),
                middleName: z.string().optional(),
            }),

            dateOfBirth: z.string({
                required_error: 'Date of birth is required',
            }).optional(),

            gender: z.string({
                required_error: 'Gender is required',
            }).optional(),

            bloodGroup: z.string({
                required_error: 'Blood group is required',
            }).optional(),

            email: z
                .string({
                    required_error: 'Email is required',
                })
                .email(),

            contactNo: z.string({
                required_error: 'Contact number is required',
            }).optional(),

            emergencyContactNo: z.string({
                required_error: 'Emergency contact number is required',
            }).optional(),

            presentAddress: z.string({
                required_error: 'Present address is required',
            }).optional(),

            designation: z.string({
                required_error: 'Designation is required',
            }).optional(),
            profileImage: z.string().optional(),
        }),
    }),
});

export const UserValidation = {
    createTraineeZodSchema,
    createTrainerZodSchema,
    createAdminZodSchema,
};
