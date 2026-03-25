export const isFormValid = (email, password) => {
  // EMAIL VALIDATION

  if (!email ) return 'Email is required';

  if (!email.includes("@")) {
    return "Email must contain @ symbol";
  }

  if (!email.includes(".")) {
    return "Email must contain a domain (example: .com)";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Email format is invalid";
  }

  // PASSWORD VALIDATION
  if (!password ) return 'Password is required';
  if (password.length < 8) {
    return "Password expect 8 characters";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password expect uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Password expect lowercase letter";
  }

  if (!/\d/.test(password)) {
    return "Password expect number";
  }

  if (!/[@$!%*?&]/.test(password)) {
    return "Password expect special character (@$!%*?&)";
  }

  return null;
};
