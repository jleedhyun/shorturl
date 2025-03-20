import crypto from 'crypto';

export const generateRandomString = (length = 7) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const result = [];

  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % chars.length;
    result.push(chars[randomIndex]);
  }

  return result.join('');
};
