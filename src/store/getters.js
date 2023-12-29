const getters = {
  // 获取应用的侧边栏状态
  sidebar: state => state.app.sidebar,

  // 获取应用的设备信息
  device: state => state.app.device,

  // 获取用户的身份验证令牌
  token: state => state.user.token,

  // 获取用户的头像信息
  avatar: state => state.user.avatar,

  // 获取用户的用户名
  name: state => state.user.name
}

export default getters
