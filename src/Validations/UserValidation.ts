import { z } from "zod";

export const UserValidation = z.object({
  firstName: z.string().refine((val) => val.length > 0, {
    message: "First name is required",
  }),
  lastName: z.string().refine((val) => val.length > 0, {
    message: "Last name is required",
  }),
  email: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .refine((val) => val.length > 0, {
      message: "Email is required",
    }),
  dateOfBirth: z.date(),
  address: z.object({
    street: z.string(),
    city: z.string(),
  }),
  department: z.object({
    id: z.string(),
  }),
});
