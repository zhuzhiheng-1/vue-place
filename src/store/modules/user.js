// 引入与用户相关的 API 方法
import { login, logout, getInfo, register } from '@/api/user'
// 引入与用户认证相关的工具方法
import { getToken, setToken, removeToken } from '@/utils/auth'
// 引入路由重置方法
import { resetRouter } from '@/router'

// 定义一个函数，用于获取默认状态
const getDefaultState = () => {
  return {
    token: getToken(), // 使用工具方法获取保存在本地的 token
    name: '', // 用户名
    avatar: '', // 用户头像
    roles: [] // 用户角色
  }
}

// 初始化状态，调用 getDefaultState 函数
const state = getDefaultState()

// 定义 mutations，用于同步地修改状态
const mutations = {
  // 重置状态为默认状态
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 设置 token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置用户名
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 设置用户头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 设置用户角色
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

// 定义 actions，用于处理异步逻辑和触发 mutations
const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 调用登录 API 方法，传递用户名和密码
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // 提交 mutation 设置 token
        commit('SET_TOKEN', data.token)
        // 将 token 保存到本地
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户注册
  register({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 调用注册 API 方法，传递用户名和密码
      register({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // 提交 mutation 设置 token
        commit('SET_TOKEN', data.token)
        // 将 token 保存到本地
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用获取用户信息 API 方法，传递 token
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          // 如果获取不到有效的用户信息，拒绝 Promise，并返回错误信息
          return reject('Verification failed, please Login again.')
        }
        if (data.roles && data.roles.length > 0) {
          // 从后端获取到用户角色
          commit('SET_ROLES', data.roles)
        } else {
          reject('getInfo: roles must be a non-null array!')
        }

        const { name, avatar } = data
        // 提交 mutations 设置用户名和用户头像
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用登出 API 方法，传递 token
      logout(state.token).then(() => {
        // 移除本地的 token
        removeToken()
        // 重置路由
        resetRouter()
        // 提交 mutations 重置状态为默认状态
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      // 移除本地的 token
      removeToken()
      // 提交 mutations 重置状态为默认状态
      commit('RESET_STATE')
      resolve()
    })
  }
}

// 导出包含命名空间、状态、mutations、actions 的对象
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
