export const isValidPrice = (value: unknown): boolean => {
  if (value === undefined || value === null || value === '') {
    return true;
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  return typeof num === 'number' && !isNaN(num) && num >= 0;
};

export const isValidPriceRange = (min?: number, max?: number): boolean => {
  if (min === undefined || max === undefined) {
    return true;
  }

  return min <= max;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
  return phoneRegex.test(phone);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<script[^>]*>.*?<\/script>/gi, '');
};

