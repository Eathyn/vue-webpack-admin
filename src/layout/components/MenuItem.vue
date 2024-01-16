<script setup lang="ts">
import { generateTitle } from '@/utils/i18n'
import SvgIcon from '@/component/SvgIcon.vue'
import { useSidebarStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const sidebarStore = useSidebarStore()
const { isOpenSidebar } = storeToRefs(sidebarStore)

defineProps<{
  title: string
  icon: string
}>()

const iconMarginRight = computed(() => (isOpenSidebar.value ? '10px' : '0'))
</script>

<template>
  <i v-if="icon.includes('el-icon')" />
  <SvgIcon
    v-else
    :icon-class="icon"
    class="icon"
  />
  <span>
    {{ generateTitle(title) }}
  </span>
</template>

<style scoped lang="scss">
.icon {
  margin-right: v-bind(iconMarginRight);
}
</style>
