// 导入 Cookies 库
import Cookies from 'js-cookie'

// 定义存储 Token 的键名
const TokenKey = 'user_token'

/**
 * 获取 Token
 * @returns {string|null} 返回存储的 Token，如果不存在则返回 null
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * 设置 Token
 * @param {string} token 要存储的 Token
 * @returns {undefined} 无返回值
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 * 移除 Token
 * @returns {undefined} 无返回值
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}
