import { Router } from 'express';

import { PermissionController } from '@/controllers/permission.controller.js';
import { asyncHandler } from '@/middlewares/async-handler.js';

// import { requirePermission } from '../middlewares/requirePermission.middleware';

const PermissionRoutes = Router();
const controller = new PermissionController();

PermissionRoutes.post('/', asyncHandler(controller.create.bind(controller)));

PermissionRoutes.get('/', asyncHandler(controller.getAllPermissions.bind(controller)));
// router.get('/:id', controller.getById.bind(controller));

// router.put('/:id', controller.update.bind(controller));

PermissionRoutes.delete('/:id', controller.deletePermission.bind(controller));

export default PermissionRoutes;
