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
  <div
    class="hamburger"
    @click="handleClickHamburger"
  >
    <SvgIcon :icon-class="iconClass" />
  </div>
</template>

<style scoped lang="scss">
.hamburger {
  height: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
