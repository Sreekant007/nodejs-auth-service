import { Router } from 'express';

import { UserController } from '@/controllers/user.controller.js';
import { asyncHandler } from '@/middlewares/async-handler.js';

const UserRoutes = Router();
const userController = new UserController();

UserRoutes.get('/', asyncHandler(userController.getAllUser.bind(userController)));

UserRoutes.post('/', asyncHandler(userController.getAllUser.bind(userController)));

export default UserRoutes;
