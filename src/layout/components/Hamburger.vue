<script setup lang="ts">
import { computed } from 'vue'
import { useSidebarStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const sidebarStore = useSidebarStore()
const { isOpenSidebar } = storeToRefs(sidebarStore)
const { triggerSidebar } = sidebarStore
const iconClass = computed(() =>
  isOpenSidebar.value ? 'hamburger-opened' : 'hamburger-closed',
)

function handleClickHamburger() {
  triggerSidebar()
}
</script>

<template>
  <SvgIcon
    :icon-class="iconClass"
    class="icon"
    @click="handleClickHamburger"
  />
</template>

<style scoped lang="scss">
.icon {
  width: 1.3em;
  height: 1.3em;
}
</style>
