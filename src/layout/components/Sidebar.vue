<script setup lang="ts"></script>

<template>
  <div class="sidebar">
    <el-scrollbar>
      <el-menu
        background-color="#304156"
        text-color="#ffffff"
      >
        <el-menu-item index="1">个人中心</el-menu-item>
        <el-menu-item index="2">数据可视化</el-menu-item>
        <el-sub-menu index="3">
          <template #title>用户</template>
          <el-menu-item index="3-1">员工管理</el-menu-item>
          <el-menu-item index="3-2">角色列表</el-menu-item>
          <el-menu-item index="3-3">权限列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>文章</template>
          <el-menu-item index="4-1">文章排名</el-menu-item>
          <el-menu-item index="4-2">创建文章</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  height: 100vh;
  background: #304156;
}
</style>
