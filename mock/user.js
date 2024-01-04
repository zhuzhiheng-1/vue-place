
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },
  // user register
  {
    url: '/vue-admin-template/user/register',
    type: 'post',
    response: config => {
      const { username } = config.body

      // 如果用户已存在，则模拟注册失败
      if (users[`${username}-token`]) {
        return {
          code: 409,
          message: '用户名已存在'
        }
      } else {
        // 用户不存在，模拟注册成功
        const newUserToken = `${username}-token`
        // 将新用户的 token 存储到 tokens 对象中
        tokens[username] = {
          token: newUserToken
        }
        users[newUserToken] = {
          roles: ['editor'],
          introduction: `I am a new user - ${username}`,
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          name: `New User - ${username}`
        }

        // 返回新用户的 token
        return {
          code: 20000,
          data: {
            token: newUserToken
          }
        }
      }
    }
  },
  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
