import request from '@/utils/request'

export const getList = (params) => {
  console.log('getList')
  return request({
    url: '/post/list',
    method: 'get',
    params
  })
}

export const removeList = (params) => {
  console.log('removeList')
  return request({
    url: '/post/removelist',
    method: 'post',
    data: params
  })
}

export const addList = (params) => {
  console.log('addList')
  return request({
    url: '/post/addlist',
    method: 'post',
    data: params
  })
}

export const editList = (params) => {
  console.log('editList')
  return request({
    url: '/post/editlist',
    method: 'post',
    data: params
  })
}

export function getListLocal(params) {
  return request({
    url: '/Pst/post.json',
    method: 'get',
    params
  })
}
