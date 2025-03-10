"use strict";
import {  Model, UUIDV4 } from "sequelize";
import { IArticleAttributes } from "../interfaces/types/models/article.model.types";


module.exports = (sequelize: any, DataTypes: any) => {
  class Article extends Model<IArticleAttributes> implements IArticleAttributes {
    id!: string;
    title!: string;
    text!: string;
    type!: string;
    // userId!: ForeignKey<IUserAttributes['id']>; 
    static associate(models: any) {
      Article.belongsTo(models.User, { foreignKey: 'userId' , targetKey: 'id'}); 
    }
  }

  Article.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      text: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
       userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  
  return Article;
};
