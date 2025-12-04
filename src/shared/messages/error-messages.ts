/**
 * Centralized Error Messages
 * * All error messages used throughout the application are defined here
 * for easy management, translation, and consistency.
 */

export const ErrorMessages = {
  // Authentication & User Registration
  auth: {
    emailAlreadyInUse: "The email address is already in use.",
    usernameAlreadyInUse: "This username is already taken.",
    usernameRequired: "Username cannot be empty.",
    passwordRequired: "Password cannot be empty.",
    usernameNotFound: "This username is not registered.",
    passwordIncorrect: "The password is incorrect.",
    unauthenticated: "Unauthenticated",
    somethingWentWrong: "Something went wrong",
    duplicatedUser: "A user with this email or username already exists.",
  },

  // Validation Messages (used in entity decorators)
  validation: {
    emailInvalid: "The email address is invalid.",
    emailRequired: "Email address cannot be empty.",
    usernameMinLength: "Username must be at least 3 characters long.",
    passwordMinLength: "Password must be at least 6 characters long.",
    nameRequired: "Name cannot be empty.",
    titleRequired: "Title cannot be empty.",
  },

  // General Errors
  general: {
    somethingWentWrong: "An unexpected error occurred.",
    notFound: "Not found.",
  },

  // Community/Sub Errors
  community: {
    notFound: "Community not found.",
    alreadyExists: "This community already exists.",
    notOwner: "You do not own this community.",
  },

  // Post Errors
  post: {
    notFound: "Post not found.",
    titleRequired: "Title cannot be empty.",
  },

  // Vote Errors
  vote: {
    notFound: "Vote not found.",
  },

  // File Upload Errors
  file: {
    notAnImage: "The file is not a valid image.",
    invalidFile: "Invalid file.",
    invalidType: "Invalid file type.",
  },
} as const;

/**
 * Helper function to get nested error messages with type safety
 */
export function getErrorMessage(
  category: keyof typeof ErrorMessages,
  key: string
): string {
  const categoryMessages = ErrorMessages[category];
  if (categoryMessages && key in categoryMessages) {
    return (categoryMessages as any)[key];
  }
  return ErrorMessages.general.somethingWentWrong;
}

