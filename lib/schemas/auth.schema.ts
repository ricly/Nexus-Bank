import { ZodType, z } from "zod";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export type UserRegistrationProps = {
  country: string;
  gender: string;
  firstName: string;
  middleName?: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    country: z.string().min(1, { message: "Country is required" }),
    gender: z.string().min(1, { message: "Gender is required" }),
    firstName: z
      .string()
      .min(2, { message: "Name must be atleast 2 characters" }),
    middleName: z.string().optional(),
    surname: z
      .string()
      .min(2, { message: "Name must be atleast 2 characters" }),

    email: z.string().email({ message: "Incorrect email format" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,64}$/.test(
            value ?? ""
          ),
        "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: "You must enter a 6 digit code" }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserLoginProps = {
  email: string;
  password: string;
};

export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
  code: string;
  email: string;
};

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: "You did not enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    }),
});

export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    email: z.string().email({ message: "You did not enter a valid email" }),

    code: z.string().min(6, { message: "You must enter a 6 digit code" }),
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,64}$/.test(
            value ?? ""
          ),
        "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });
