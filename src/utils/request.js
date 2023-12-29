import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求的基础路径，url = 基础路径 + 请求路径
  // withCredentials: true, // 跨域请求时是否需要使用凭证
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    // 如果用户已登录，让每个请求携带token
    // ['X-Token'] 是一个自定义的请求头，根据实际情况修改
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error) // 用于调试，打印错误信息
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果你想获取响应头或状态信息等
   * 请直接返回 response => response
   */

  /**
   * 通过自定义代码判断响应状态
   * 这里只是一个例子
   * 你也可以通过 HTTP 状态码来判断
   */
  response => {
    const res = response.data

    // 如果自定义状态码不是 20000，则判定为错误
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 非法的token; 50012: 其他客户端登录; 50014: Token过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm('您已登出，您可以取消以停留在此页面，或再次登录', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // 对响应错误做点什么
    console.log('err' + error) // 用于调试，打印错误信息
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
