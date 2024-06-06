import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const generateToken = (
  jwtPayload: { userId?: string; role?: string, email?: string},
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
