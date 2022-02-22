// import * as cypto from 'crypto';
import * as bcrypt from 'bcryptjs';

export function bcryptCreateSalt() {
  return bcrypt.genSaltSync(12);
}

/**
 * 加密用户密码
 * @param {String} password 用户明文密码
 * @param {String} salt 盐
 * @returns {String} 加密后的密码
 */
export function bcryptEncript(password: string, salt: any = null): string {
  if (!salt) {
    salt = bcryptCreateSalt();
  }
  return bcrypt.hashSync(password, salt);
}

/**
 * 验证用户密码是否匹配
 * @param password 用户明文
 * @param cipher 加密密文
 * @returns {Boolean} 是否匹配
 */
export function bcryptValidate(password: string, cipher: string): boolean {
  return bcrypt.compareSync(password, cipher);
}
