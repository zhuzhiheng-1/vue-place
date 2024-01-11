const Mock = require('mockjs')

const data = Mock.mock({
  'TheoreticalScore|30': [{
    'id|+1': 1, // 每次递增1，表示第几次做题
    username: '@name', // 用户名
    submit_time: '@datetime', // 提交时间
    score: '@integer(0, 100)', // 得分情况，假设得分在0到100之间
    abandoned: '@boolean' // 是否放弃，随机生成 true 或 false
  }],
  'BasicScore|30': [{
    'id|+1': 1, // 每次递增1，表示第几次做题
    username: '@name', // 用户名
    submit_time: '@datetime', // 提交时间
    score: '@integer(0, 100)' // 得分情况，假设得分在0到100之间
  }],
  'ExtensionScore|30': [{
    'id|+1': 1, // 每次递增1，表示第几次做题
    username: '@name', // 用户名
    submit_time: '@datetime', // 提交时间
    score: '@integer(0, 100)'// 得分情况，假设得分在0到100之间
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/getTheoreticalScore/list',
    type: 'get',
    response: config => {
      const TheoreticalScore = data.TheoreticalScore
      return {
        code: 20000,
        data: {
          total: TheoreticalScore.length,
          TheoreticalScore: TheoreticalScore
        }
      }
    }
  },
  {
    url: '/vue-admin-template/getBasicScore/list',
    type: 'get',
    response: config => {
      const BasicScore = data.BasicScore
      return {
        code: 20000,
        data: {
          total: BasicScore.length,
          BasicScore: BasicScore
        }
      }
    }
  },
  {
    url: '/vue-admin-template/getExtensionScore/list',
    type: 'get',
    response: config => {
      const ExtensionScore = data.ExtensionScore
      return {
        code: 20000,
        data: {
          total: ExtensionScore.length,
          ExtensionScore: ExtensionScore
        }
      }
    }
  }
]
