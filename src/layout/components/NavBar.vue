<script setup lang="ts">
import { useLoginStore, useLogoutStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import Hamburger from '@/layout/components/Hamburger.vue'
import Breadcrumb from '@/layout/components/Breadcrumb.vue'

const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)
const { avatar } = userInfo.value
const logoutStore = useLogoutStore()
const { logout } = logoutStore

function handleCommand(command: string) {
  if (command === 'logout') {
    logout()
  }
}
</script>

<template>
  <div class="nav">
    <Hamburger class="item" />
    <Breadcrumb class="breadcrumb" />
    <div class="item avatar">
      <el-dropdown
        trigger="click"
        @command="handleCommand"
      >
        <el-avatar
          shape="square"
          :src="avatar"
        />
        <template #dropdown>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
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
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
}

:deep(.el-avatar) {
  background: #ffffff;
}

.item {
  transition: background 0.4s;
}

.item:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
}

.avatar:hover {
  background: none;
}

.breadcrumb {
  flex: 1;
}
</style>
