<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { generateTitle } from '@/utils/i18n'

interface RouteTag {
  text: string
  path: string
}

const route = useRoute()
const router = useRouter()
const routeTags = ref<Array<RouteTag>>([])
const activeRouteTag = computed<RouteTag>(() => ({
  text: generateTitle(route.meta.title as string),
  path: route.path,
}))

function generateRouteTags() {
  const tagFound = routeTags.value.find((tag) => tag.path === route.path)
  if (tagFound) {
    return
  }
  routeTags.value.push({
    text: generateTitle(route.meta.title as string),
    path: route.path,
  })
}

function handleTagClick(tagClicked: RouteTag) {
  if (tagClicked.path === activeRouteTag.value.path) {
    return
  }
  router.push({ path: tagClicked.path })
}

function handleTagClose(tagClosed: RouteTag) {
  if (tagClosed.path === activeRouteTag.value.path) {
    return
  }
  const closedTagIndex = routeTags.value.findIndex(
    (tag) => tag.path === tagClosed.path,
  )
  routeTags.value.splice(closedTagIndex, 1)
}

watch(route, generateRouteTags, { immediate: true })
</script>

<template>
  <div class="route-tags">
    <el-tag
      v-for="(tag, index) in routeTags"
      :key="index"
      disable-transitions
      :effect="tag.path !== activeRouteTag.path ? 'plain' : 'dark'"
      :closable="tag.path !== activeRouteTag.path"
      @click="handleTagClick(tag)"
      @close="handleTagClose(tag)"
    >
      {{ tag.text }}
    </el-tag>
  </div>
</template>

<style scoped lang="scss">
.route-tags {
  padding: 4px 16px;
  border-bottom: 1px solid #d8dce5;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
}

.el-tag {
  border-color: #d8dce5;
  border-radius: 0;
  margin-right: 5px;
  height: 28px;
}

.el-tag:hover {
  cursor: pointer;
}

:deep(.el-tag__content) {
  color: #495060;
}

:deep(.el-tag__close) {
  color: #495060;
}

:deep(.el-tag__close:hover) {
  background: #495060;
}

.el-tag--dark {
  background: #304156;
  border-color: #304156;
  :deep(.el-tag__content) {
    color: #ffffff;
  }
}
</style>
