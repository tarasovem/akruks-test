<script setup lang="ts">
import { ref } from 'vue'
import CreateProductDialog from './CreateProductDialog.vue'

const dialogRef = ref<InstanceType<typeof CreateProductDialog> | null>(null)

const openDialog = () => {
  dialogRef.value?.open()
}

defineExpose({
  openDialog,
})
</script>

<template>
  <div class="flex justify-end mt-4">
    <CreateProductDialog ref="dialogRef" />
  </div>
</template>
