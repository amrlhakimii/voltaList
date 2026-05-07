export type FirestoreDoc<T extends object = Record<string, unknown>> = T & { id: string }
