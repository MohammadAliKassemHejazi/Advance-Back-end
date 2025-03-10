import {  Response } from "express";
import { userService } from "../services";
import {
  IAuthLoginBodyRequest,
  IAuthRegisterBodyRequest,
} from "../interfaces/types/controllers/auth.controller.types";
import authErrors from "../utils/errors/auth.errors";
import customError from "../utils/customError";
import { IUserAttributes } from "../interfaces/types/models/user.model.types";
import { CustomRequest } from '../interfaces/types/middlewares/request.middleware.types';

export const handleLogin = async (request: IAuthLoginBodyRequest, response: Response,next:any) => {
  const { email, password } = request.body;
  try {
    const login = await userService.userLogin(email, password);
    response.json(login);
  } catch (error) {
    next(authErrors.AuthInvalidEmail);
  }
};

export const handleRegister = async (
  request: IAuthRegisterBodyRequest,
  response: Response,
  next:any
): Promise<void> => {
  const { email, password, name, address, phone } = request.body;
  try {
    const user: IUserAttributes = await userService.createUser({
      email,
      password,
      name,
      address,
      phone,
    });
    response.status(201).json(user);
  } catch (error) {
    next(authErrors.AuthRegisterFailure);
  }
};

export const isAuthenticated = async (
  request: CustomRequest,
  response: Response,
  next:any,
): Promise<void> => {
  try{
  const UserId = request.UserId; // Assuming UserId is accessible via middleware
  const userSession = await userService.userSession(UserId!);
  response.json(userSession);
  }catch(e){
    next(e)
  }
};

export const loggedOut = async (
  request: CustomRequest,
  response: Response
): Promise<void> => {
  const UserId = request.UserId; // Assuming UserId is accessible via middleware
  response.json(UserId);
};

export default {
  handleLogin,
  handleRegister,
  isAuthenticated,
  loggedOut,
};
