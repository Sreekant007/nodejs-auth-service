const PermissionKeys = {
  AUTH_LOGIN: 'auth.login',
  AUTH_REFRESH: 'auth.refresh',
  AUTH_LOGOUT: 'auth.logout',

  USER_CREATE: 'user.create',
  USER_READ: 'user.read',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
  USER_READ_SELF: 'user.read.self',
  USER_UPDATE_SELF: 'user.update.self',
  USER_DELETE_SELF: 'user.delete.self',

  ROLE_CREATE: 'role.create',
  ROLE_UPDATE: 'role.update',
  ROLE_DELETE: 'role.delete',
  ROLE_READ: 'role.read',
  ROLE_ASSIGN_PERMISSION: 'role.assign.permission',
} as const;

export const AllPermissions = Object.values(PermissionKeys);
