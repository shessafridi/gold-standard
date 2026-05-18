import { z } from "zod"

export const createDobValidator = (options: {
  minAge?: number
  maxAge?: number
}) => {
  const { minAge, maxAge } = options

  return z.coerce
    .date()
    .refine(
      (date) => {
        if (minAge === null || minAge === undefined) return true

        const today = new Date()
        const limit = new Date(
          today.getFullYear() - minAge,
          today.getMonth(),
          today.getDate()
        )
        return date <= limit
      },
      {
        message: `You must be at least ${minAge} years old`,
      }
    )
    .refine(
      (date) => {
        if (maxAge === null || maxAge === undefined) return true

        const today = new Date()
        const limit = new Date(
          today.getFullYear() - maxAge,
          today.getMonth(),
          today.getDate()
        )
        return date >= limit
      },
      {
        message: `Please enter a valid birth date (max age is ${maxAge})`,
      }
    )
}

export const dobOver18Validator = createDobValidator({
  minAge: 18,
  maxAge: 120,
})
