// 导入项目中的设置（settings）默认值
import defaultSettings from '@/settings'

// 从默认设置中解构出需要的属性
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

// 定义模块的状态
const state = {
  // 控制是否显示设置面板，默认使用默认设置中的值
  showSettings: showSettings,
  // 控制是否固定顶部导航栏，默认使用默认设置中的值
  fixedHeader: fixedHeader,
  // 控制是否显示侧边栏 Logo，默认使用默认设置中的值
  sidebarLogo: sidebarLogo
}

// 定义 mutations，用于修改状态
const mutations = {
  // 修改指定属性的值
  CHANGE_SETTING: (state, { key, value }) => {
    // 检查指定的属性是否存在于 state 中，如果存在则修改其值
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

// 定义 actions，用于处理异步逻辑
const actions = {
  // 修改设置，接受一个包含 key 和 value 的对象作为参数
  changeSetting({ commit }, data) {
    // 调用 mutations 中的 CHANGE_SETTING 方法修改状态
    commit('CHANGE_SETTING', data)
  }
}

// 导出模块配置对象
export default {
  namespaced: true, // 开启命名空间
  state, // 状态
  mutations, // 修改状态的方法
  actions // 处理异步逻辑的方法
}
