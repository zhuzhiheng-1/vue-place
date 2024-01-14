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
  'GradesList|30': [{
    'id|1000000001-9999999999': 1, // 学号：10位非零开头的数字
    username: '@cname', // 姓名：中文姓名
    'gender|1': ['男', '女'], // 性别：男或女
    class: '@integer(10, 30)级@integer(1,9)班', // 班级：例如：20级1班 19级2班 xx为非零开头的数字
    major: () => {
      const index = Mock.Random.integer(0, majors.length - 1)
      return majors[index]
    }, // 使用函数获取随机专业    class: '@integer(10, 30)级@integer(1,9)班', // 班级：例如：20级1班 19级2班 xx为非零开头的数字
    'theoryScore|60-100': 1, // 理论实验成绩：60到100之间的随机数
    'basicScore|60-100': 1, // 基础实验成绩：60到100之间的随机数
    'extensionScore|60-100': 1, // 拓展实验成绩：60到100之间的随机数
    totalScore: function() { // 总分：理论实验成绩 + 基础实验成绩 + 拓展实验成绩
      return this.theoryScore + this.basicScore + this.extensionScore
    }
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/getGradesList/list',
    type: 'get',
    response: config => {
      const GradesList = data.GradesList
      return {
        code: 20000,
        data: {
          total: GradesList.length,
          GradesList: GradesList
        }
      }
    }
  }
]
