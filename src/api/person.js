import request from '@/utils/request'

export function getTeacherList(params) {
  return request({
    url: '/vue-admin-template/getTeacherList/list',
    method: 'get',
    params
  })
}
export function getStudentList(params) {
  return request({
    url: '/vue-admin-template/getStudentList/list',
    method: 'get',
    params
  })
}
