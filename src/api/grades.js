import request from '@/utils/request'

export function getGradesList(params) {
  return request({
    url: '/vue-admin-template/getGradesList/list',
    method: 'get',
    params
  })
}
