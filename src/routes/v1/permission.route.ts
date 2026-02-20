import { Router } from 'express';

import { PermissionController } from '@/controllers/permission.controller.js';
import { asyncHandler } from '@/middlewares/async-handler.js';

// import { requirePermission } from '../middlewares/requirePermission.middleware';

const PermissionRoutes = Router();
const controller = new PermissionController();

PermissionRoutes.post('/', asyncHandler(controller.create.bind(controller)));
PermissionRoutes.get(
  '/add-all-permission',
  asyncHandler(controller.createAllPermission.bind(controller)),
);

PermissionRoutes.get('/', asyncHandler(controller.getAllPermissions.bind(controller)));

PermissionRoutes.delete('/:id', asyncHandler(controller.deletePermission.bind(controller)));

PermissionRoutes.post(
  '/assign-role-permission',
  asyncHandler(controller.assignRolePermission.bind(controller)),
);
PermissionRoutes.post(
  '/update-role-permission',
  asyncHandler(controller.assignRolePermission.bind(controller)),
);

PermissionRoutes.post(
  '/revoke-role-permission',
  asyncHandler(controller.revokeRolePermission.bind(controller)),
);

export default PermissionRoutes;
