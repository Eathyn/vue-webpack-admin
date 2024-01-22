<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import { useSidebarStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import SidebarItem from '@/layout/components/SidebarItem.vue'

const router = useRouter()
const route = useRoute()
const sidebarStore = useSidebarStore()
const { isOpenSidebar } = storeToRefs(sidebarStore)
const menuRoutes = computed(() =>
  generateMenus(filterRoutes(router.getRoutes())),
)
const activeMenuItem = computed(() => route.path)
</script>

<template>
  <div class="sidebar">
    <div class="title">
      <el-avatar
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        :size="44"
      />
      <h1
        v-show="isOpenSidebar"
        class="header"
      >
        Admin
      </h1>
    </div>
    <el-scrollbar>
      <el-menu
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#ffffff"
        :default-active="activeMenuItem"
        unique-opened
        class="el-menu"
        :collapse="!isOpenSidebar"
        :collapse-transition="false"
      >
        <SidebarItem
          v-for="item in menuRoutes"
          :key="item.path"
          :route="item"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  min-height: 100vh;
  background: #304156;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  margin-bottom: 20px;

  :deep(.el-avatar) {
    --el-avatar-bg-color: none;
  }

  .header {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    padding-left: 15px;
  }
}

.el-menu:not(.el-menu--collapse) {
  width: 210px;
}

.el-menu {
  border-right: none;
}
</style>
