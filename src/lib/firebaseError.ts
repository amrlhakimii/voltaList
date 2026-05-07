import { FirebaseError } from 'firebase/app'

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'permission-denied':
        return 'You do not have permission to do this'
      case 'unavailable':
        return 'Service unavailable. Check your connection'
      default:
        return error.message
    }
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong'
}
