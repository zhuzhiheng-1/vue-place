const Mock = require('mockjs')

const majors = [
  '计算机科学与技术',
  '软件工程',
  '信息与计算科学',
  '网络工程',
  '数据科学与大数据技术',
  '人工智能',
  '数字媒体技术',
  '计算机应用技术',
  '信息管理与信息系统',
  '物联网工程',
  '计算机与通信工程',
  '计算机网络技术',
  '软件设计与开发',
  '信息安全与管理',
  '云计算与大数据技术'
]
const data = Mock.mock({
  'StudentList|30': [{
    'id|1000000001-9999999999': 1, // 学号：10位非零开头的数字
    username: '@cname', // 姓名：中文姓名
    'gender|1': ['男', '女'], // 性别：男或女
    class: '@integer(10, 30)级@integer(1,9)班', // 班级：例如：20级1班 19级2班 xx为非零开头的数字
    major: () => {
      const index = Mock.Random.integer(0, majors.length - 1)
      return majors[index]
    } // 使用函数获取随机专业
  }],
  'TeacherList|10': [{
    'id|+1': 1, // 每次递增1，表示第几次做题
    username: '@cname', // 用户名
    class: '@integer(10, 30)级@integer(1,9)班', // 班级：例如：20级1班 19级2班 xx为非零开头的数字
    'role|1': ['admin'] // 权限为admin
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/getStudentList/list',
    type: 'get',
    response: config => {
      const StudentList = data.StudentList
      return {
        code: 20000,
        data: {
          total: StudentList.length,
          StudentList: StudentList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/getTeacherList/list',
    type: 'get',
    response: config => {
      const TeacherList = data.TeacherList
      return {
        code: 20000,
        data: {
          total: TeacherList.length,
          TeacherList: TeacherList
        }
      }
    }
  }
]
