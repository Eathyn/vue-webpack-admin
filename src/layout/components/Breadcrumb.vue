<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { generateTitle } from '@/utils/i18n'

interface BreadCrumb {
  path: string
  title: string
}

const route = useRoute()
const breadCrumbData = ref<Array<BreadCrumb>>([])

function generateBreadCrumbData() {
  const matchedRoutes = route.matched
  breadCrumbData.value = []
  matchedRoutes.forEach((route) => {
    if (route.path !== '/') {
      breadCrumbData.value.push({
        path: route.path,
        title: route.meta.title as string,
      })
    }
  })
}

watch(route, generateBreadCrumbData, { immediate: true })
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadCrumbData"
      :key="index"
      :to="{ path: item.path }"
    >
      {{ generateTitle(item.title) }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
:deep(.el-breadcrumb__item .el-breadcrumb__inner) {
  color: #666;
}

:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: #97a8be;
}
</style>
