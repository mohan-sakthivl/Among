export const isValidPhoneNumber = (phone: string): boolean => {
  // E.164-like or standard 10+ digit format
  return /^\+?[1-9]\d{7,14}$/.test(phone.replace(/[\s-]/g, ''));
};

export const isValidOtp = (otp: string): boolean => {
  return /^\d{6}$/.test(otp);
};
