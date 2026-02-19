import { Router } from 'express';

import { RoleController } from '@/controllers/role.controller.js';
import { asyncHandler } from '@/middlewares/async-handler.js';

const RoleRoutes = Router();
const roleController = new RoleController();

RoleRoutes.get('/', asyncHandler(roleController.getAllRoles.bind(roleController)));

RoleRoutes.post('/', asyncHandler(roleController.create.bind(roleController)));

RoleRoutes.delete('/:id', asyncHandler(roleController.deleteRole.bind(roleController)));

export default RoleRoutes;
