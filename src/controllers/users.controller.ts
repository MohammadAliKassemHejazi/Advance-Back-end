import { Request, Response } from "express";
import { IAuthLoginBodyResponse } from "../interfaces/types/controllers/auth.controller.types";
import { userService } from "../services";
import { CustomRequest } from '../interfaces/types/middlewares/request.middleware.types';

export const handleUserProfile = async (
  request: CustomRequest,
  response: Response
): Promise<void> => {
  const UserId = request.UserId;
  try {
    const user: IAuthLoginBodyResponse = await userService.getUserById(UserId!);
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  handleUserProfile,
};
