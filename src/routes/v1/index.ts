import { Router } from 'express';

import PermissionRoutes from '@/routes/permission.route.js';

const v1Router = Router();

v1Router.use('/permissions', PermissionRoutes);

export { v1Router };
