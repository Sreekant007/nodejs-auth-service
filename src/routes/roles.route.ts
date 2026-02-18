import { Router } from 'express';

import { RoleController } from '@/controllers/role.controller.js';
import { asyncHandler } from '@/middlewares/async-handler.js';

const RoleRouter = Router();
const roleController = new RoleController();

RoleRouter.get('/', asyncHandler(roleController.getAllRoles.bind(roleController)));

RoleRouter.post('/', asyncHandler(roleController.create.bind(roleController)));

RoleRouter.delete('/:id', asyncHandler(roleController.deleteRole.bind(roleController)));

export default RoleRouter;
