"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetRole = exports.SetPermCode = exports.IsLogin = exports.NoAuth = exports.ROLE_KEY = exports.PERM_CODE = exports.IS_LOGIN_KEY = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
exports.IS_LOGIN_KEY = 'isLogin';
exports.PERM_CODE = 'permCode';
exports.ROLE_KEY = 'role';
const NoAuth = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.NoAuth = NoAuth;
const IsLogin = () => (0, common_1.SetMetadata)(exports.IS_LOGIN_KEY, true);
exports.IsLogin = IsLogin;
const SetPermCode = (code) => (0, common_1.SetMetadata)(exports.PERM_CODE, code);
exports.SetPermCode = SetPermCode;
const SetRole = (role) => (0, common_1.SetMetadata)(exports.ROLE_KEY, role);
exports.SetRole = SetRole;
//# sourceMappingURL=customize.js.map