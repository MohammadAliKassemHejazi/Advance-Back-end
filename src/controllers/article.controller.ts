import {  NextFunction, Response } from "express";
import { articleService } from "../services";
import {
  ArticleCreateBodyRequest,
  ArticleGetRequest,
  IArticlesBodyResponse,
} from "../interfaces/types/controllers/article.controller.types";
import customError from "../utils/customError";
import { IArticleAttributes } from "../interfaces/types/models/article.model.types";
import articleErrors from "../utils/errors/article.errors";
import { CustomRequest } from '../interfaces/types/middlewares/request.middleware.types';

export const handleCreate = async (
  request: ArticleCreateBodyRequest,
  response: Response,
  next:NextFunction
): Promise<void> => {
  const userId = request.UserId
  const {title, text, type } = request.body;
  try {
    const article: IArticleAttributes = await articleService.createArticle({
      title,
      text,
      type,
      userId,
    });
    response.status(201).json(article);
  } catch (error) {
    next(customError(articleErrors.ArticleCreateFailure));
  }
};

export const handleGetArticles = async (
  request: ArticleGetRequest,
  response: Response,
  next : NextFunction
): Promise<void> => {
  try {
    const articles = await articleService.fetchArticles();
    response.json(articles);
  } catch (error) {
    next(error);
  }
};

export const handleGetByAuthor = async (
  request: CustomRequest,
  response: Response,
  next:NextFunction
): Promise<void> => {
  const userId = request.UserId; // Assuming UserId is accessible via middleware
  if (userId) {
    try {
      const data: IArticlesBodyResponse = await articleService.fetchArticleByAuthor(
        userId
      );
      const responseData = { data };
      response.json(responseData);
    } catch (error) {
       next(error)
    }
  }
};

export const handleGetArticleById = async (
  request: ArticleGetRequest,
  response: Response
): Promise<void> => {
  const id = request.query.id as string; // Assuming id is always a string in your case
  if (!id) {
    response.status(400).json({ error: "Article ID is required" });
    return;
  }
  try {
    const article: IArticleAttributes = await articleService.fetchArticleById(
      id
    );
    response.json(article);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};



export const handleUpdate = async (
  request: CustomRequest,
  response: Response
): Promise<void> => {
  const userId = request.UserId; // Access UserId from request object
  if (!userId) {
    response.status(401).json({ error: "User ID not found" });
    return;
  }

  const { title, text, type } = request.body;
  const id = request.params.id;
  
  try {
    const article: Number[] = await articleService.updateArticle(
      id!,
      title!,
      text!,
      type!,
      userId
    );
    response.json(article);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};



export const handleDelete = async (
  request: CustomRequest,
  response: Response
): Promise<void> => {
  const id = request.params.id;
  const userId = request.UserId;
  try {
    const result: number = await articleService.deleteArticle(id, userId!);
    response.json(result);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  handleCreate,
  handleGetArticleById,
  handleUpdate,
  handleDelete,
  handleGetByAuthor,
  handleGetArticles,
};
