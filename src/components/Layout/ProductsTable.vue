<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useProductsStore } from '@/stores/products'
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import EditProductDialog from './EditProductDialog.vue'

const productsStore = useProductsStore()
const editDialogRef = ref<InstanceType<typeof EditProductDialog> | null>(null)

type SortDirection = 'asc' | 'desc' | null
type SortColumn = 'id' | 'title' | 'price' | 'datetime' | null

const sortColumn = ref<SortColumn>(null)
const sortDirection = ref<SortDirection>(null)

const isDeleteDialogOpen = ref(false)
const productToDelete = ref<number | null>(null)

const toggleSort = (column: SortColumn) => {
  if (sortColumn.value === column) {
    if (sortDirection.value === 'asc') sortDirection.value = 'desc'
    else if (sortDirection.value === 'desc') {
      sortDirection.value = null
      sortColumn.value = null
    } else sortDirection.value = 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const getSortIcon = (column: SortColumn) => {
  if (sortColumn.value === column) {
    return sortDirection.value === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'
  }
  return 'lucide:chevrons-up-down'
}

const confirmDelete = (id: number) => {
  productToDelete.value = id
  isDeleteDialogOpen.value = true
}

const removeProduct = () => {
  if (productToDelete.value) {
    productsStore.removeProduct(productToDelete.value)
    isDeleteDialogOpen.value = false
    productToDelete.value = null
  }
}

// Функция для редактирования товара
const editProduct = (id: number) => {
  editDialogRef.value?.open(id)
}

// Отсортированные продукты
const sortedProducts = computed(() => {
  if (!sortColumn.value || !sortDirection.value) return productsStore.products

  return [...productsStore.products].sort((a, b) => {
    let aValue = a[sortColumn.value as keyof typeof a]
    let bValue = b[sortColumn.value as keyof typeof b]

    if (aValue === undefined || bValue === undefined) return 0

    if (sortColumn.value === 'datetime') {
      aValue = new Date(aValue as string).getTime()
      bValue = new Date(bValue as string).getTime()
    } else if (sortColumn.value === 'price') {
      aValue = Number(aValue)
      bValue = Number(bValue)
    }

    if (sortDirection.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })
})

// Проверка на пустой массив
const isEmpty = computed(() => productsStore.products.length === 0)
</script>

<template>
  <div class="rounded-md border mt-10">
    <div v-if="isEmpty" class="p-8 text-center">
      <p class="text-muted-foreground">Данные отсутствуют</p>
    </div>
    <Table v-else>
      <TableHeader>
        <TableRow>
          <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('id')">
            <div class="flex items-center gap-2">
              ID
              <Icon
                :icon="getSortIcon('id')"
                class="h-4 w-4 text-muted-foreground"
                :class="{ 'text-foreground': sortColumn === 'id' }"
              />
            </div>
          </TableHead>
          <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('title')">
            <div class="flex items-center gap-2">
              Название
              <Icon
                :icon="getSortIcon('title')"
                class="h-4 w-4 text-muted-foreground"
                :class="{ 'text-foreground': sortColumn === 'title' }"
              />
            </div>
          </TableHead>
          <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('price')">
            <div class="flex items-center gap-2">
              Цена
              <Icon
                :icon="getSortIcon('price')"
                class="h-4 w-4 text-muted-foreground"
                :class="{ 'text-foreground': sortColumn === 'price' }"
              />
            </div>
          </TableHead>
          <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('datetime')">
            <div class="flex items-center gap-2">
              Дата и время
              <Icon
                :icon="getSortIcon('datetime')"
                class="h-4 w-4 text-muted-foreground"
                :class="{ 'text-foreground': sortColumn === 'datetime' }"
              />
            </div>
          </TableHead>
          <TableHead class="w-[150px]">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="product in sortedProducts" :key="product.id">
          <TableCell>{{ product.id }}</TableCell>
          <TableCell>{{ product.title }}</TableCell>
          <TableCell>{{ product.price }}</TableCell>
          <TableCell>{{ new Date(product.datetime).toLocaleString('ru-RU') }}</TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                @click="editProduct(product.id as number)"
                class="flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Icon icon="lucide:pencil" class="h-4 w-4" />
                <span class="sr-only">Редактировать</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                @click="confirmDelete(product.id as number)"
                class="flex items-center gap-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <Icon icon="lucide:trash-2" class="h-4 w-4" />
                <span class="sr-only">Удалить</span>
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <EditProductDialog ref="editDialogRef" />

    <!-- Диалог подтверждения удаления -->
    <Dialog v-model:open="isDeleteDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Подтверждение удаления</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить этот товар? Это действие нельзя отменить.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="mt-4">
          <Button variant="outline" @click="isDeleteDialogOpen = false">Отмена</Button>
          <Button variant="destructive" @click="removeProduct">Удалить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
