<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { onMounted, ref } from 'vue'
import ProductsTable from './components/Layout/ProductsTable.vue'
import TableActions from './components/Layout/TableActions.vue'

const productsStore = useProductsStore()
const tableActionsRef = ref<InstanceType<typeof TableActions> | null>(null)

const handleOpenCreateDialog = () => {
  tableActionsRef.value?.openDialog()
}

onMounted(() => {
  productsStore.loadProducts()
})
</script>

<template>
  <header class="py-6 flex items-center justify-center text-2xl font-bold tracking-wide">
    Товары на складе
  </header>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <TableActions ref="tableActionsRef" />
    <ProductsTable @open-create-dialog="handleOpenCreateDialog" />
  </main>
</template>
