import { ContactFormData, FormErrors } from '@/types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateForm = (formData: ContactFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Adınız gereklidir';
  }

  if (!formData.email.trim()) {
    errors.email = 'E-posta adresi gereklidir';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Geçerli bir e-posta adresi giriniz';
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Geçerli bir telefon numarası giriniz';
  }

  if (!formData.subject.trim()) {
    errors.subject = 'Konu gereklidir';
  }

  if (!formData.message.trim()) {
    errors.message = 'Mesaj gereklidir';
  }

  return errors;
};

export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
