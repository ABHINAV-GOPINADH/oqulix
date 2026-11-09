export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePhone(phone) {
  return /^\d{10,15}$/.test(phone.replace(/[\s\-().+]/g, ''));
}

export function validateCustomer(data) {
  const errors = {};

  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required.';
  }

  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required.';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!data.phone || data.phone.trim() === '') {
    errors.phone = 'Phone number is required.';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Enter a valid phone number (10–15 digits).';
  }

  if (!data.company || data.company.trim() === '') {
    errors.company = 'Company name is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
