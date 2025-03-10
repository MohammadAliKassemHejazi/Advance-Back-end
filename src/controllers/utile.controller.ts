import {  Response,NextFunction } from "express";

import { utileService } from "../services"

import { CustomRequest } from '../interfaces/types/middlewares/request.middleware.types';


export const handelGetAllCategories = async (
  request: CustomRequest,
  response: Response,
  next :NextFunction
): Promise<void> => {

  try {
    const categories = await utileService.getAllCategories();
    response.json(categories);
  } catch (error) {
    next(error);
  }

};
export const handelGetSubCategoriesByID = async (
  request: CustomRequest,
  response: Response,
  next :NextFunction
): Promise<void> => {
  const id = request.query.id as string;
  try {
    const subcategories = await utileService.getSubCategories(id);
    response.json(subcategories);
  } catch (error) {
    next(error);
  }

};

export const handelGetSizes = async (
  request: CustomRequest,
  response: Response,
  next :NextFunction
): Promise<void> => {

  try {
    const Sizes = await utileService.getAllSizes();
    response.json(Sizes);
  } catch (error) {
    next(error);
  }

};

export default {
  handelGetAllCategories,
  handelGetSubCategoriesByID,
  handelGetSizes,
};




