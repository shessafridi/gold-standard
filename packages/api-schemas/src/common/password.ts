import z from "zod"

export const passwordValidator = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(64, { message: "Password cannot exceed 64 characters" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character",
  })
