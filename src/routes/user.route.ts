import { Router } from "express";
import {
  handleFetchUsersByCreator,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
  handleAssignRoleToUser,
  handleRemoveRoleFromUser,
} from "../controllers/user.controller";
import { protectedRoutes } from "../middlewares";

const router = Router();

// Define routes to protect
const protectedRoutesList = ["/create", "/update/:id", "/delete/:id", "/:userId/roles", "/:userId/roles/:roleId"];
protectedRoutes(router, protectedRoutesList);

/**
 * @swagger
 * /users?createdById=me:
 *   get:
 *     summary: Fetch users created by the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users created by the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", handleFetchUsersByCreator);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input (missing or invalid fields)
 */
router.post("/", handleCreateUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input (missing or invalid fields)
 *       404:
 *         description: User not found
 */
router.put("/:id", handleUpdateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", handleDeleteUser);

/**
 * @swagger
 * /users/{userId}/roles:
 *   post:
 *     summary: Assign a role to a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignRoleRequest'
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
 *       400:
 *         description: Invalid input (missing or invalid fields)
 *       404:
 *         description: User or role not found
 */
router.post("/:userId/roles", handleAssignRoleToUser);

/**
 * @swagger
 * /users/{userId}/roles/{roleId}:
 *   delete:
 *     summary: Remove a role from a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - name: roleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role to remove
 *     responses:
 *       200:
 *         description: Role removed successfully
 *       404:
 *         description: User or role not found
 */
router.delete("/:userId/roles/:roleId", handleRemoveRoleFromUser);

export default router;