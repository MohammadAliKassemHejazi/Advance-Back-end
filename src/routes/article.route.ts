import { Router } from "express";
import {
  handleGetArticles,
  handleGetArticleById,
  handleGetByAuthor,
  handleCreate,
  handleUpdate,
  handleDelete,
} from "../controllers/article.controller";
import { protectedRoutes } from "../middlewares";

const router = Router();

// Routes to protect
const Routes = ["/get/author", "/create", "/update/:id", "/delete/:id"];

// Apply protectedRoutes middleware
protectedRoutes(router, Routes);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       500:
 *         description: Internal server error
 */
router.get("/", handleGetArticles);

/**
 * @swagger
 * /articles/get:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to fetch
 *     responses:
 *       200:
 *         description: The article details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Missing or invalid article ID
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */
router.get("/get", handleGetArticleById);

/**
 * @swagger
 * /articles/get/author:
 *   get:
 *     summary: Get articles by author
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of articles by the authenticated author
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */
router.get("/get/author", handleGetByAuthor);

/**
 * @swagger
 * /articles/create:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateArticleRequest'
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Invalid input (missing or invalid fields)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */
router.post("/create", handleCreate);

/**
 * @swagger
 * /articles/update/{id}:
 *   patch:
 *     summary: Update an article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateArticleRequest'
 *     responses:
 *       200:
 *         description: Article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Invalid input (missing or invalid fields)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */
router.patch("/update/:id", handleUpdate);

/**
 * @swagger
 * /articles/delete/{id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to delete
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", handleDelete);

export default router;