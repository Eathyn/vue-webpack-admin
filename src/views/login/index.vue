<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  password: '',
})
</script>

<template>
  <div class="container">
    <div class="title">用户登录</div>
    <el-form
      :model="form"
      size="large"
    >
      <el-form-item>
        <el-input
          v-model="form.name"
          style="background: #283443"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          style="background: #283443"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
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
</style>
