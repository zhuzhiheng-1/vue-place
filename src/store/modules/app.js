import Cookies from 'js-cookie'

// app 模块的状态
const state = {
  // 侧边栏状态
  sidebar: {
    // 默认从 Cookies 中获取侧边栏状态，如果不存在则默认为打开状态
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // 是否禁用动画
    withoutAnimation: false
  },
  // 设备类型，默认为桌面设备
  device: 'desktop'
}

// app 模块的 mutations，用于修改状态
const mutations = {
  // 切换侧边栏状态
  TOGGLE_SIDEBAR: state => {
    // 取反侧边栏状态
    state.sidebar.opened = !state.sidebar.opened
    // 关闭禁用动画
    state.sidebar.withoutAnimation = false
    // 设置 Cookies 记录侧边栏状态，1 表示打开，0 表示关闭
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  // 关闭侧边栏
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    // 关闭侧边栏，设置 Cookies 记录为关闭状态
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    // 设置是否禁用动画
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换设备类型
  TOGGLE_DEVICE: (state, device) => {
    // 修改设备类型
    state.device = device
  }
}

// app 模块的 actions，用于处理异步逻辑或提交多个 mutations
const actions = {
  // 切换侧边栏
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  // 关闭侧边栏
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 切换设备类型
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

// 导出 app 模块的配置对象
export default {
  namespaced: true, // 开启命名空间
  state, // 状态
  mutations, // 修改状态的方法
  actions // 处理异步逻辑的方法
}
