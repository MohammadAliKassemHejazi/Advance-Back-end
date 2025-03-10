import { Request } from "express";
import { verify } from "jsonwebtoken";
import customError from "../utils/customError";
import config from "../config/config";
import { ITokenDecoded } from "../interfaces/types/middlewares/auth.middleware.types";
import authErrors from "../utils/errors/auth.errors";
import { CustomRequest } from '../interfaces/types/middlewares/request.middleware.types';
export const validateHeadersAuth = (req: Request): string => {
  const header: string | undefined = req.headers.authorization;
  if (!header) {
    throw customError(authErrors.AuthMissingHeaders);
  }
  const accessToken: string = header.split(" ")[1];
  if (!accessToken) {
    throw customError(authErrors.AuthMissingHeaders);
  }
  return accessToken;
};

export const verifyToken = async (req: CustomRequest): Promise<boolean> => {
  try {
    const token = validateHeadersAuth(req);
    const decoded: ITokenDecoded = verify(
      token,
      config.webtoken as string
    ) as ITokenDecoded;

    // You may need to cast request to any and add properties to it
    (req as any).UserId = decoded.aud;
    return true;
  } catch (err) {
    throw customError(authErrors.AuthJWTError);
  }
};

export default { verifyToken };
