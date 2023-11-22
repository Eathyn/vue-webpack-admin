<script setup lang="ts">
import md5 from 'md5'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { LoginForm } from '@/views/login/types'
import { useLoginStore } from '@/store/user'
import { login } from '@/api/sys'
import { TOKEN } from '@/constant'
import { setItem } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'

const loginStore = useLoginStore()
const { setToken } = loginStore

const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<LoginForm>({
  username: 'super-admin',
  password: '123456',
})
const rules = reactive<FormRules<LoginForm>>({
  username: [{ required: true, message: '用户名为必填项' }],
  password: [
    { required: true, message: '密码为必填项', trigger: 'blur' },
    { min: 6, message: '密码不能少于 6 位', trigger: 'blur' },
  ],
})

function submitForm(formEle: FormInstance) {
  formEle.validate((valid) => {
    if (valid) {
      userLogin(ruleForm)
    } else {
      console.log('not valid')
    }
  })
}

async function userLogin(userInfo: LoginForm) {
  const { username, password } = userInfo
  try {
    const { token } = await login({
      username,
      password: md5(password),
    })
    setToken(token)
    setItem(TOKEN, token)
    setTimeStamp()
    await router.push('/')
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="container">
    <div class="title">用户登录</div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      size="large"
    >
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username"
          style="background: #283443"
          placeholder="username"
          clearable
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          style="background: #283443"
          placeholder="password"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          @click="submitForm(ruleFormRef)"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  min-width: 100vw;
  min-height: 100vh;
  background: #2d3a4b;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 26px;
  color: #eee;
  font-weight: bold;
  margin: 160px 0 40px;
}

.el-form {
  width: 500px;
}

.el-button {
  width: 100%;
}

:deep(.el-input__wrapper) {
  background: #283443;
  box-shadow: none;
  border: 0.5px solid #3e4957;
}

:deep(.el-input__inner) {
  color: #ffffff;
}
</style>
