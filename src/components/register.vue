<template>
  <div class="register-page">
    <van-nav-bar title="注册" />

    <van-form @submit.prevent="handleRegister" class="form">
      <van-field
        v-model="form.username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />

      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field
        v-model="form.email"
        name="邮箱"
        label="邮箱"
        placeholder="请输入邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />

      <div class="button-container">
        <van-button round block type="primary" @click="handleRegister">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showNotify } from 'vant'
import shop3 from '@/api/shop3'

const router = useRouter()
const form = reactive({
  username: '',
  password: '',
  email: ''
})

async function handleRegister() {
  try {
    const response = await shop3.register(form)
    console.log(response)
    if (response.code === 0) {
      showNotify({ type: 'success', message: response.msg })
    } else {
      showNotify({ type: 'danger', message: '注册失败，请重试' })
      router.push('/login')
    }
  } catch (error) {
    console.error('注册时出错:', error)
    showNotify({ type: 'danger', message: '注册过程中发生错误' })
  }
}
</script>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #d5f0c7;
}

.van-nav-bar {
  width: 100%;
}

.form {
  width: 100%;
}

.button-container {
  margin-top: 16px;
  text-align: center;
}
</style>
