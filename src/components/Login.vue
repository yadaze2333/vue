<template>
  <div class="container">
    <div class="content">
      <van-nav-bar title="登录" />
      <van-form class="form">
        <van-field v-model="user.username" name="用户名" placeholder="用户名" />
        <van-field v-model="user.password" type="password" name="密码" placeholder="密码" />
        <div class="button-container">
          <van-button block type="primary" @click="login">登录</van-button>
          <van-button block type="info" @click="goToRegister">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import shop3 from '@/api/shop3'

const router = useRouter()
const user = reactive({
  username: '',
  password: ''
})

async function login() {
  try {
    const res = await shop3.login(user)
    if (res.code === 0) {
      alert(res.msg)
    } else {
      window.localStorage.setItem('token', res.data.session_id)
      router.push('/shopping')
    }
  } catch (error) {
    console.error('登录时出错:', error)
  }
}

function goToRegister() {
  router.push('/register')
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ff9318;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  width: 100%;
}

.button-container {
  margin-top: 16px;
}

/* 使用van-button默认的margin-top */
.van-button {
  margin-top: 10px;
}
</style>
