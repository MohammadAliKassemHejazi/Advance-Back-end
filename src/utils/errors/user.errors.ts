import { CustomErrorParams } from "../customError";

export const UserFetchFailure: CustomErrorParams = {
  message: "Failed to fetch users.",
  code: "USER001",
  statusCode: 400,
};

export const UserCreateFailure: CustomErrorParams = {
  message: "Failed to create user.",
  code: "USER002",
  statusCode: 400,
};

export const UserUpdateFailure: CustomErrorParams = {
  message: "Failed to update user.",
  code: "USER003",
  statusCode: 400,
};

export const UserDeleteFailure: CustomErrorParams = {
  message: "Failed to delete user.",
  code: "USER004",
  statusCode: 400,
};

export const UserRoleAssignmentFailure: CustomErrorParams = {
  message: "Failed to assign role to user.",
  code: "USER005",
  statusCode: 400,
};

export const UserRoleRemovalFailure: CustomErrorParams = {
  message: "Failed to remove role from user.",
  code: "USER006",
  statusCode: 400,
};

export const UserNotFound: CustomErrorParams = {
  message: "User not found.",
  code: "USER007",
  statusCode: 404,
};

export const RoleNotFound: CustomErrorParams = {
  message: "Role not found.",
  code: "USER008",
  statusCode: 404,
};

export const UserRoleNotFound: CustomErrorParams = {
  message: "Role not assigned to user.",
  code: "USER009",
  statusCode: 404,
};

export default {
  UserFetchFailure,
  UserCreateFailure,
  UserUpdateFailure,
  UserDeleteFailure,
  UserRoleAssignmentFailure,
  UserRoleRemovalFailure,
  UserNotFound,
  RoleNotFound,
  UserRoleNotFound,
};