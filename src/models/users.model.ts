"use strict";
import { Model, DataTypes } from "sequelize";
import { IUserAttributes } from "../interfaces/types/models/user.model.types";

module.exports = (sequelize: any) => {
  class User extends Model implements IUserAttributes {
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    phone!: string;
    address!: string;
    createdById!: string | null; // Optional field to track who created the user
    static associate(models: any) {
      // One-to-one relations
      User.hasOne(models.RoleUser, { foreignKey: "userId" });
      User.hasOne(models.Package, { foreignKey: "userId" });
      User.hasOne(models.Cart, { foreignKey: "userId" });
      User.hasOne(models.Favorite, { foreignKey: "userId" });

      // One-to-many relations
      User.hasMany(models.Store, { foreignKey: "userId", onDelete: "CASCADE" });
      User.hasMany(models.Article, { foreignKey: "userId", onDelete: "CASCADE" });
      User.hasMany(models.Order, { foreignKey: "userId", onDelete: "CASCADE" });

      // Self-referential relationship for tracking who created the user
      User.belongsTo(models.User, { foreignKey: "createdById", as: "CreatedBy" });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      createdById: {
        type: DataTypes.UUID,
        allowNull: true, // Optional field
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};