import express from 'express';

import authController from "../controllers/auth.controller";

import { protectedRoutes } from "../middlewares";
const router = express.Router();
  const Routes = [
    "/isauthenticated",
  ];

  // function add hook onRequest -> protectedRoutes(appInstance, Routes you want to protect)
protectedRoutes(router, Routes); 

router.post("/login", authController.handleLogin);
router.post("/register",authController.handleRegister);
router.get("/isauthenticated", authController.isAuthenticated);

export default router;
