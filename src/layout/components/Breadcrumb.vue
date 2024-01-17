<script setup lang="ts">
import { useRouteStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { generateTitle } from '@/utils/i18n'

interface BreadCrumb {
  path: string
  title: string
}

const routeStore = useRouteStore()
const { currentRoute } = storeToRefs(routeStore)
const breadCrumbData = ref<Array<BreadCrumb>>([])

function generateBreadCrumbData() {
  const matchedRoutes = currentRoute.value!.matched
  breadCrumbData.value = []
  for (const route of matchedRoutes) {
    if (route.path !== '/') {
      breadCrumbData.value.push({
        path: route.path,
        title: route.meta.title as string,
      })
    }
  }
}

watch(currentRoute, generateBreadCrumbData, { immediate: true })
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
