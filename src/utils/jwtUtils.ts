import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || '20d46c64cb5cc4f9cb9b464c65cd164f313ddc1c73d9640a0660dee729e5d2d57c79f3a8e7110df2ed8852d4f035d87bc3352b337d3411d502c6584ed432144f';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
