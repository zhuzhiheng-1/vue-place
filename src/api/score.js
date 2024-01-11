import request from '@/utils/request'
// 获得理论成绩列表
export function getTheoreticalScore(params) {
  return request({
    url: '/vue-admin-template/getTheoreticalScore/list',
    method: 'get',
    params
  })
}
// 获得基础成绩列表
export function getBasicScore(params) {
  return request({
    url: '/vue-admin-template/getBasicScore/list',
    method: 'get',
    params
  })
}
// 获得扩展成绩列表
export function getExtensionScore(params) {
  return request({
    url: '/vue-admin-template/getExtensionScore/list',
    method: 'get',
    params
  })
}
