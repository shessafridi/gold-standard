export const getInitials = (string: string | undefined) => {
  if (!string) return "U"
  const names = string.split(" ")
  let initials = names[0]?.substring(0, 1).toUpperCase() ?? ""

  if (names.length > 1) {
    initials += names[names.length - 1]?.substring(0, 1).toUpperCase() ?? ""
  }
  return initials
}

export const fullName = (
  firstName: string | null | undefined,
  lastName: string | null | undefined
) => {
  return [firstName, lastName].filter(Boolean).join(" ")
}
