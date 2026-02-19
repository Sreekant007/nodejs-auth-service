import { Router } from 'express';

import PermissionRoutes from '@/routes/v1/permission.route.js';
import RoleRoutes from '@/routes/v1/roles.route.js';
import UserRoutes from '@/routes/v1/user.routes.js';

const v1Router = Router();

v1Router.use('/permissions', PermissionRoutes);
v1Router.use('/roles', RoleRoutes);
v1Router.use('/users', UserRoutes);

export { v1Router };
