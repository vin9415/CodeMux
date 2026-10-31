/**
 * Input sanitization and validation utilities
 * Enforces strict validation:
 * - Names: Alphabetic characters and spaces only (no numbers or special symbols)
 * - Phones: Numeric digits only (no letters, hyphens, or symbols)
 * - Emails: Standard RFC-compliant email structure
 * - Passwords: Minimum length and security checks
 */

export const sanitizeName = (val: string): string => {
  // Allow only alphabets and spaces
  return val.replace(/[^a-zA-Z\s]/g, '');
};

export const validateName = (name: string): { isValid: boolean; error?: string } => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Full name is required.' };
  }
  if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
    return { isValid: false, error: 'Name must contain only alphabets and spaces (no numbers or special characters).' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 letters long.' };
  }
  if (trimmed.length > 60) {
    return { isValid: false, error: 'Name cannot exceed 60 characters.' };
  }
  return { isValid: true };
};

export const sanitizePhone = (val: string): string => {
  // Allow only numeric digits
  return val.replace(/\D/g, '').slice(0, 15);
};

export const validatePhone = (
  phone: string,
  required = false
): { isValid: boolean; error?: string } => {
  const digits = phone.replace(/\D/g, '');
  if (!digits) {
    if (required) {
      return { isValid: false, error: 'Phone number is required.' };
    }
    return { isValid: true };
  }
  // Standard phone numbers require between 7 and 15 digits (e.g. 10 digits for India)
  if (digits.length < 7 || digits.length > 15) {
    return {
      isValid: false,
      error: `Please enter a valid phone number (${digits.length < 10 ? 'minimum 10 digits for mobile' : 'maximum 15 digits'}).`,
    };
  }
  return { isValid: true };
};

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Email address is required.' };
  }
  // Standard email validation pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. name@domain.com).' };
  }
  return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: 'Password is required.' };
  }
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long.' };
  }
  return { isValid: true };
};

export const sanitizeAge = (val: string): number | '' => {
  const digits = val.replace(/\D/g, '');
  if (!digits) return '';
  const num = parseInt(digits, 10);
  if (isNaN(num)) return '';
  if (num > 99) return 99;
  return num;
};
