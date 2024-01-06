import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从 cookie 中获取 token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress 配置

const whiteList = ['/login', '/register', '/404'] // 无需重定向白名单

router.beforeEach(async(to, from, next) => {
  console.log('Navigating to:', to.path)
  // 开启进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取roles
          const data = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', data.roles)
          router.options.routes = store.getters.permission_routes
          router.addRoutes(accessRoutes)
          /*
          当你调用 router.addRoutes(routes) 动态添加路由时，Vue Router 会进行异步操作来加载和解析这些路由配置。
          这个过程可能需要一些时间，特别是当路由配置较复杂或包含异步组件时。当你访问一个路由时，Vue Router
          会执行一系列的导航守卫（beforeEach, beforeResolve, afterEach 等）。
          这些导航守卫控制着路由导航的流程，允许或中断导航。如果在动态添加路由的过程中，导航守卫执行得太早，
          可能会导致新添加的路由还没有完全加载，出现刷新白屏的问题：
          1.如果 addRoutes 并未完成，路由守卫会一层一层的执行执行，直到 addRoutes 完成，找到对应的路由
          2.不然在addRoutes()之后第一次访问被添加的路由会白屏，这是因为刚刚addRoutes()就立刻访问被添加的路由，
            然而此时addRoutes()没有执行结束，因而找不到刚刚被添加的路由导致白屏。因此需要从新访问一次路由才行。
          3.如果参数to不能找到对应的路由的话，就再执行一次beforeEach((to, from, next)直到其中的next({ ...to})
            能找到对应的路由为止。
          4.replace: true只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。
          5.所以使用next({ ...to, replace: true })来确保addRoutes()时动态添加的路由已经被完全加载上去。
          6.确保添加的路由完全加载后再进行导航是为了保证应用的稳定性
          */
          /*
          其实在路由守卫中，只有next()是放行，其他的诸如：
          // next('/logon') 、 next(to) 或者 next({ ...to, replace: true })都不是放行，而是：
                “中断当前导航，执行新的导航！！！！”
          举例：beforeEach((to, from, next) => {
                  next('/logon')
                }
                其实不会直接跳转到/logon路由，而是：
                beforeEach((to, from, next) => {
                  beforeEach(('/logon', from, next) => {
                    beforeEach(('/logon', from, next) => {
                      beforeEach(('/logon', from, next) => {
                        beforeEac...  // 一直循环下去...... , 因为我们没有使用 next() 放行
                      }
                    }
                  }
                }
          */
          next(
            {
              ...to,
              replace: true
            }
          )
        } catch (error) {
          console.error('Error generating routes:', error)
          // 移除 token 并跳转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || '发生错误')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 无 token

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // 其他无权限访问的页面重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
