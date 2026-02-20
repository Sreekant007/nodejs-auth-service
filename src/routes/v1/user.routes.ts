import { Router } from 'express';

import { UserController } from '@/controllers/user.controller.js';
import { asyncHandler } from '@/middlewares/async-handler.js';
import { validate } from '@/middlewares/validation.middleware.js';
import { CreateUserSchema } from '@/validators/user.validator.js';

const UserRoutes = Router();
const userController = new UserController();

UserRoutes.get('/', asyncHandler(userController.getAllUser.bind(userController)));

UserRoutes.post(
  '/',
  validate(CreateUserSchema),
  asyncHandler(userController.createUser.bind(userController)),
);

export default UserRoutes;
