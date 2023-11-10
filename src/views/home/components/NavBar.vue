<script setup lang="ts">
import { useLoginStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)
const { avatar } = userInfo.value
</script>

<template>
  <div class="nav">
    <div class="item occupy"></div>
    <div class="item">
      <el-dropdown trigger="click">
        <el-avatar
          shape="square"
          :src="avatar"
        />
        <template #dropdown>
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item>课程主页</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav {
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  padding: 0 16px;
}

:deep(.el-avatar) {
  background: #ffffff;
}

.occupy {
  flex: 1;
}

.item:hover {
  cursor: pointer;
}
</style>
