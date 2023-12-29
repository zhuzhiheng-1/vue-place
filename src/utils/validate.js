/**
 * 判断是否为外部链接
 * @param {string} path - 要判断的路径
 * @returns {Boolean} - 是否为外部链接
 */
export function isExternal(path) {
  // 使用正则表达式判断路径是否以 "http:", "https:", "mailto:", 或 "tel:" 开头
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证用户名是否合法
 * @param {string} str - 要验证的用户名
 * @returns {Boolean} - 是否为合法用户名
 */
export function validUsername(str) {
  // 预定义一组合法的用户名
  const valid_map = ['admin', 'editor']
  // 判断传入的用户名是否在合法用户名列表中，去除首尾空格后再进行判断
  return valid_map.indexOf(str.trim()) >= 0
}
