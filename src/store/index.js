// 导入 Vue 和 Vuex 库
import Vue from 'vue'
import Vuex from 'vuex'

// 导入包含 getter 函数的模块
import getters from './getters'

// 导入各个 Vuex 模块
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'

// 在 Vue 中启用 Vuex
Vue.use(Vuex)

// 创建 Vuex Store 实例
const store = new Vuex.Store({
  // 各个模块的状态和 getter 函数
  modules: {
    app,
    settings,
    user,
    permission
  },
  // 全局的 getter 函数
  getters
})

// 导出 Vuex Store 实例
export default store
