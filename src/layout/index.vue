<template>
  <div class="app-wrap">
    <div class="sidebar-wrap">
      <Sidebar />
    </div>
    <div class="main-wrap">
      <NavBar />
      <RouteTags />
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMain from '@/layout/components/AppMain.vue'
import NavBar from '@/layout/components/NavBar.vue'
import Sidebar from '@/layout/components/Sidebar.vue'
import RouteTags from '@/layout/components/RouteTags.vue'
</script>

<style scoped lang="scss">
.app-wrap {
  display: flex;
}

.main-wrap {
  flex: 1;
}
</style>
