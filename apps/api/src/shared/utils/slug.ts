import { randomBytes } from "node:crypto"
import { ValidationError } from "../errors"

/**
 * Generates a URL-friendly slug from a string.
 */
export const generateSlug = (text: string): string => {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

  if (!slug.trim()) throw new ValidationError("Generated empty slug")

  return slug
}

/**
 * Generates a short random suffix.
 */
export const generateRandomSuffix = (length = 4): string => {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length)
}
