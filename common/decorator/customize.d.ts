export declare const IS_PUBLIC_KEY = "isPublic";
export declare const IS_LOGIN_KEY = "isLogin";
export declare const PERM_CODE = "permCode";
export declare const ROLE_KEY = "role";
export declare const NoAuth: () => import("@nestjs/common").CustomDecorator<string>;
export declare const IsLogin: () => import("@nestjs/common").CustomDecorator<string>;
export declare const SetPermCode: (code: string[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const SetRole: (role: string[]) => import("@nestjs/common").CustomDecorator<string>;
