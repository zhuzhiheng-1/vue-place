import defaultSettings from '@/settings'

// 从设置中获取标题，默认为 'C++仿真实验平台'
const title = defaultSettings.title || 'C++仿真实验平台'

/**
 * 获取页面标题
 * @param {string} pageTitle - 页面标题
 * @returns {string} - 完整的页面标题
 */
export default function getPageTitle(pageTitle) {
  // 如果传入了页面标题，则返回格式化后的页面标题，包含基本标题和页面标题
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  // 否则，返回基本标题
  return `${title}`
}
