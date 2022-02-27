"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptValidate = exports.bcryptEncript = exports.bcryptCreateSalt = void 0;
const bcrypt = require("bcryptjs");
function bcryptCreateSalt() {
    return bcrypt.genSaltSync(12);
}
exports.bcryptCreateSalt = bcryptCreateSalt;
function bcryptEncript(password, salt = null) {
    if (!salt) {
        salt = bcryptCreateSalt();
    }
    return bcrypt.hashSync(password, salt);
}
exports.bcryptEncript = bcryptEncript;
function bcryptValidate(password, cipher) {
    return bcrypt.compareSync(password, cipher);
}
exports.bcryptValidate = bcryptValidate;
//# sourceMappingURL=encription.js.map