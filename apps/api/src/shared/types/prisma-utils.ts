type PrismaGeneratedFields = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'; // optional if you use soft deletes

export type StripGenerated<T> = Omit<T, PrismaGeneratedFields>;
