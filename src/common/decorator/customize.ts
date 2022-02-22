import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const IS_LOGIN_KEY = 'isLogin';
export const PERM_CODE = 'permCode';
export const ROLE_KEY = 'role';
export const NoAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
export const IsLogin = () => SetMetadata(IS_LOGIN_KEY, true);
export const SetPermCode = (code: string[]) => SetMetadata(PERM_CODE, code);
export const SetRole = (role: string[]) => SetMetadata(ROLE_KEY, role);
