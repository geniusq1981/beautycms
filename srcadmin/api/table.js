import request from '@/utils/request'

export function getList(params) {
  console.log('getList')
  return request({
    url: '/post/list',
    method: 'get',
    params
  })
}

export function getListLocal(params) {
  return request({
    url: '/Pst/post.json',
    method: 'get',
    params
  })
}
