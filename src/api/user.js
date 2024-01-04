// 引入封装的请求工具
import request from '@/utils/request'

// 用户登录请求
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login', // 请求的后端接口地址
    method: 'post', // 请求方法为 POST
    data // 请求的数据，通常包含用户名和密码等信息
  })
}
// 用户注册
export function register(data) {
  return request({
    url: '/vue-admin-template/user/register', // 请求的后端接口地址
    method: 'post', // 请求方法为 POST
    data // 请求的数据，通常包含用户名和密码等信息
  })
}
// 获取用户信息请求
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info', // 请求的后端接口地址
    method: 'get', // 请求方法为 GET
    params: { token } // 请求的参数，通常包含用户的 token
  })
}

// 用户退出登录请求
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout', // 请求的后端接口地址
    method: 'post' // 请求方法为 POST
  })
}
