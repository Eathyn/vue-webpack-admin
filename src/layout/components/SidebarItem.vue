<script setup lang="ts">
import MenuItem from '@/layout/components/MenuItem.vue'

defineProps({
  route: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <el-sub-menu
    v-if="route.children.length > 0"
    :index="route.path"
  >
    <template #title>
      <MenuItem
        :title="route.meta.title"
        :icon="route.meta.icon"
      />
    </template>
    <SidebarItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="route.path"
  >
    <MenuItem
      :title="route.meta.title"
      :icon="route.meta.icon"
    />
  </el-menu-item>
</template>
