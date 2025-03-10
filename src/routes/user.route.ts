import express from 'express';

import { protectedRoutes } from '../middlewares';

import { usersController } from "../controllers";


  // routes want to protect
  const Routes = [
    "/profile",
  ];


const router = express.Router()

protectedRoutes(router, Routes);
  
router.get(
    "/profile",
    usersController.handleUserProfile
);



export  default router;

