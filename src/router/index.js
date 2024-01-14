import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 布局组件 */
import Layout from '@/layout'

/**
 * 注意：只有当 route 的 children.length >= 1 时，子菜单才会显示
 * 详细请参考：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为 true，该项将不显示在侧边栏中（默认为 false）
 * alwaysShow: true               如果设置为 true，将始终显示根菜单
 *                                如果未设置 alwaysShow，在一个路由下有多个子路由时，
 *                                它将变为嵌套的模式，否则不显示根菜单
 * redirect: noRedirect           如果设置了 noRedirect，则在 breadcrumb 中点击时不会重定向
 * name:'router-name'             由 <keep-alive> 使用，必须设置
 * meta : {
    roles: ['admin','editor']    控制页面角色访问权限（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'/'el-icon-x' 侧边栏中显示的图标
    breadcrumb: false            如果设置为 false，该项将在 breadcrumb 中隐藏（默认为 true）
    activeMenu: '/example/list'  如果设置了 path，侧边栏将高亮显示你设置的路径
  }
 */

/**
 * 常规路由（无权限要求）
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  }
]
export const asyncRoutes = [
  {
    path: '/experiment',
    component: Layout,
    redirect: '/experiment/theoretical',
    name: 'Experiment',
    meta: { title: '实验内容', icon: 'el-icon-s-help', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'theoretical',
        name: 'Theoretical',
        component: () => import('@/views/experiment/theoretical/index'),
        meta: { title: '理论实验', icon: 'el-icon-s-flag', roles: ['admin', 'editor'] }
      },
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/views/experiment/basic/index'),
        meta: { title: '基础实验', icon: 'el-icon-s-flag', roles: ['admin', 'editor'] }
      },
      {
        path: 'extension',
        name: 'Extension',
        component: () => import('@/views/experiment/extension/index'),
        meta: { title: '拓展实验', icon: 'el-icon-s-flag', roles: ['admin', 'editor'] }
      }
    ]
  },

  {
    path: '/scores',
    component: Layout,
    redirect: '/scores/theoretical',
    name: 'Scores',
    meta: { title: '实验成绩', icon: 'el-icon-s-marketing', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'theoretical',
        name: 'TheoreticalScores',
        component: () => import('@/views/scores/theoretical/index'),
        meta: { title: '理论实验成绩', icon: 'el-icon-s-flag', roles: ['admin', 'editor'] }
      },
      {
        path: 'basic',
        name: 'BasicScores',
        component: () => import('@/views/scores/basic/index'),
        meta: { title: '基础实验成绩', icon: 'el-icon-s-flag', roles: ['admin', 'editor'] }
      },
      {
        path: 'extension',
        name: 'ExtensionScores',
        component: () => import('@/views/scores/extension/index'),
        meta: { title: '拓展实验成绩', icon: 'el-icon-s-flag', roles: ['admin', 'editor'] }
      },
      {
        path: 'total',
        name: 'TotalScores',
        component: () => import('@/views/scores/total/index'),
        meta: { title: '总分', icon: 'el-icon-s-flag', roles: ['admin', 'editor'] }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/teacher-list',
    name: 'User',
    meta: { title: '用户管理', icon: 'el-icon-user', roles: ['admin'] },
    children: [
      {
        path: 'teacher-list',
        name: 'TeacherList',
        component: () => import('@/views/user/teacher-list/index'),
        meta: { title: '教师列表', icon: 'el-icon-user', roles: ['admin'] }
      },
      {
        path: 'student-list',
        name: 'studentList',
        component: () => import('@/views/user/student-list/index'),
        meta: { title: '学生列表', icon: 'el-icon-user', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/grades',
    component: Layout,
    meta: { icon: 'el-icon-s-marketing', roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'Grades',
        component: () => import('@/views/grades/index'),
        meta: { title: '成绩查询', icon: 'el-icon-s-flag', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form', roles: ['admin'] }
      }
    ]
  },
  // 404 页面必须放在最后
  { path: '*', redirect: '/404', hidden: true },
  {
    path: 'tutorial-link',
    component: Layout,
    children: [
      {
        path: 'https://www.runoob.com/cplusplus/cpp-classes-objects.html',
        meta: { title: 'C++ 类与对象-教程', icon: 'link' }
      }
    ]
  }
]

// 创建路由实例
const createRouter = () => new Router({
  // 使用 'history' 模式需要服务端支持
  // mode: 'history',
  // 滚动行为，每次路由切换将滚动到顶部
  scrollBehavior: () => ({ y: 0 }),
  // 路由配置
  routes: constantRoutes
})

// 初始化路由实例
const router = createRouter()

// 重置路由，见 https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  // 创建新的路由实例
  const newRouter = createRouter()
  // 重置现有路由实例的匹配器
  router.matcher = newRouter.matcher
}

export default router

