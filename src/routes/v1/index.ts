import { Router } from 'express';

import PermissionRoutes from '@/routes/permission.route.js';
import RoleRouter from '@/routes/roles.route.js';

const v1Router = Router();

v1Router.use('/permissions', PermissionRoutes);
v1Router.use('/roles', RoleRouter);

export { v1Router };
