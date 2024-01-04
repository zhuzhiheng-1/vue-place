<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Register Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType1"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType1"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <span class="show-pwd" @click="showPwd(1)">
          <svg-icon :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType2"
          ref="confirmPassword"
          v-model="registerForm.confirmPassword"
          :type="passwordType2"
          placeholder="Confirm Password"
          name="confirmPassword"
          tabindex="3"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <span class="show-pwd" @click="showPwd(2)">
          <svg-icon :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">Register</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: any</span>
        <span> password: any</span>
        <span class="to-loginlink" @click="toLogin">已有账号，去登录</span>
      </div>

    </el-form>
  </div>
</template>
<script>
// import { validUsername } from '@/utils/validate'

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      // 使用正则表达式验证用户名格式，允许包含字母、数字、汉字和下划线，长度在3到20个字符之间
      const usernameRegex = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/
      if (!usernameRegex.test(value)) {
        callback(new Error('请输入一个有效的用户名,长度为3到20个字符,可以包含字母、数字、汉字和下划线.'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
      },
      loading: false,
      passwordType1: 'password',
      passwordType2: 'password',
      redirect: undefined
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
    showPwd(id) { // 接受标识参数，以区分是哪个密码框
      const passwordType = `passwordType${id}`
      this[passwordType] = this[passwordType] === 'password' ? '' : 'password'
      this.$nextTick(() => {
        this.$refs[`password${id}`].focus()
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/register', this.registerForm).then(() => {
            this.$router.push({ path: '/login' })
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

    <style lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg:#283443;
    $light_gray:#fff;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
      .register-container .el-input input {
        color: $cursor;
      }
    }

    /* reset element-ui css */
    .register-container {
      .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
          background: transparent;
          border: 0px;
          // -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;

          &:-webkit-autofill {
            box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: $cursor !important;
          }
        }
      }

      .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
      }
    }
    </style>

    <style lang="scss" scoped>
    $bg:#2d3a4b;
    $dark_gray:#889aa4;
    $light_gray:#eee;

    .register-container {
      min-height: 100%;
      width: 100%;
      background-color: $bg;
      overflow: hidden;

      .register-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
      }

      .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
          &:first-of-type {
            margin-right: 16px;
          }
        }
        .to-loginlink {
          color: #fff;
          text-decoration: none;
          margin-left: 113px;
          cursor: pointer;
        }
        .to-loginlink:hover {
          color: #409EFF;
        }
      }

      .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }

      .title-container {
        position: relative;

        .title {
          font-size: 26px;
          color: $light_gray;
          margin: 0px auto 40px auto;
          text-align: center;
          font-weight: bold;
        }
      }

      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }
    }
    </style>

