import db from "../models";
import { IUserAttributes } from "../interfaces/types/models/user.model.types";
import customError from "../utils/customError";
import userErrors from "../utils/errors/user.errors";

export const fetchUsersByCreator = async (creatorId: string): Promise<IUserAttributes[]> => {
  const users = await db.User.findAll({
    where: { createdById: creatorId },
  });
  return users;
};

export const createUser = async (data: { name: string; email: string; password: string }): Promise<IUserAttributes> => {
  const { name, email, password } = data;
  const user = await db.User.create({ name, email, password });
  return user;
};

export const updateUser = async (id: string, data: { name?: string; email?: string }): Promise<IUserAttributes> => {
  const user = await db.User.findByPk(id);
  if (!user) {
    throw customError(userErrors.UserNotFound);
  }

  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;

  await user.save();
  return user;
};

export const deleteUser = async (id: string): Promise<void> => {
  const user = await db.User.findByPk(id);
  if (!user) {
    throw customError(userErrors.UserNotFound);
  }

  await user.destroy();
};

export const assignRoleToUser = async (userId: string, roleId: string): Promise<any> => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw customError(userErrors.UserNotFound);
  }

  const role = await db.Role.findByPk(roleId);
  if (!role) {
    throw customError(userErrors.RoleNotFound);
  }

  const roleUser = await db.RoleUser.create({ userId, roleId });
  return roleUser;
};

export const removeRoleFromUser = async (userId: string, roleId: string): Promise<void> => {
  const roleUser = await db.RoleUser.findOne({ where: { userId, roleId } });
  if (!roleUser) {
    throw customError(userErrors.UserRoleNotFound);
  }

  await roleUser.destroy();
};