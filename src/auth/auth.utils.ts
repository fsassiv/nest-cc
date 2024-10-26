import * as argon from 'argon2';

export const generateHash = async (password: string): Promise<string> =>
  argon.hash(password);

export const doVerifyPassword = async (
  hashPassword: string,
  password: string,
): Promise<boolean> => argon.verify(hashPassword, password);
