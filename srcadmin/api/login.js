import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getUser() {
  return request({
    url: '/user/user.json',
    method: 'get',
    params: { }
  })
}

export function getInfo(token) {
  return request({
    url: '/userinfo',
    method: 'get',
    params: { token }
  })
}

export function getInfoLocal() {
  console.log('testtt')
  return request({
    url: '/user/info.json',
    method: 'get',
    params: {}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
