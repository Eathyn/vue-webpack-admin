<template>
  <div class="app-wrap">
    <div class="sidebar-wrap">
      <Sidebar />
    </div>
    <div class="main-wrap">
      <NavBar />
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMain from '@/views/home/components/AppMain.vue'
import NavBar from '@/views/home/components/NavBar.vue'
import Sidebar from '@/views/home/components/Sidebar.vue'
</script>

<style scoped lang="scss">
.app-wrap {
  display: flex;
}

.sidebar-wrap {
  width: 210px;
}

.main-wrap {
  flex: 1;
}
</style>
