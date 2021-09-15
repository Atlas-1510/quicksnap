// source: https://stackoverflow.com/questions/56113778/how-to-handle-firebase-auth-exceptions-on-flutter

export default function handleErrorCode(code) {
  let message;
  switch (code) {
    case "ERROR_EMAIL_ALREADY_IN_USE":
    case "auth/account-exists-with-different-credential":
    case "auth/email-already-in-use":
      message = "Email already used. Try logging in.";
      break;
    case "ERROR_WRONG_PASSWORD":
    case "auth/wrong-password":
      message = "Wrong email/password combination.";
      break;
    case "ERROR_USER_NOT_FOUND":
    case "auth/user-not-found":
      message = "No user found with this email.";
      break;
    case "ERROR_USER_DISABLED":
    case "auth/user-disabled":
      message = "User disabled.";
      break;
    case "ERROR_TOO_MANY_REQUESTS":
    case "auth/operation-not-allowed":
      message = "Too many requests to log into this account.";
      break;
    case "ERROR_OPERATION_NOT_ALLOWED":
      message = "Server error, please try again later.";
      break;
    case "ERROR_INVALID_EMAIL":
    case "auth/invalid-email":
      message = "Email address is invalid.";
      break;
    case "auth/weak-password":
      message = "Password should be at least 6 characters.";
      break;
    default:
      message = "Login failed. Please try again.";
      break;
  }
  return message;
}
