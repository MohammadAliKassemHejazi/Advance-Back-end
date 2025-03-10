
import { CustomRequest } from "../middlewares/request.middleware.types";

export interface ArticleCreateBodyRequest extends CustomRequest {
  body: {
    title?: string | undefined;
    text?: string | undefined;
    type?: string | undefined;
    UserId?: string | undefined;
  };
}

export interface ArticleUpdateBodyRequest extends CustomRequest {
  params: { id: string };
  body: {
    id?: string;
    title?: string | undefined;
    text?: string | undefined;
    type?: string | undefined;
  };
}

export interface ArticleGetRequest extends CustomRequest {
  query: { id: string };
}

export interface ArticleDeleteRequest extends CustomRequest {
  params: { id: string };
}

export interface IArticlesBodyResponse {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  UserId: string;
  User?: IArticleAuthor;
}

export interface IArticleAuthor {
  id: string;
  name: string;
  surname: string;
}
