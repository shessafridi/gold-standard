import z from "zod"

export const genderValidator = z.enum(["male", "female", "unknown", "other"])

export type Gender = z.infer<typeof genderValidator>
