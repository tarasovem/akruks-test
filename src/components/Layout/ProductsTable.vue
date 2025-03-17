<script setup lang="ts">
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

const productsStore = useProductsStore()

// Тип для направления сортировки
type SortDirection = 'asc' | 'desc' | null
// Тип для колонки сортировки
type SortColumn = 'id' | 'title' | 'price' | 'datetime' | null

const sortColumn = ref<SortColumn>(null)
const sortDirection = ref<SortDirection>(null)

// Функция для изменения сортировки
const toggleSort = (column: SortColumn) => {
  if (sortColumn.value === column) {
    // Переключаем направление если колонка та же
    if (sortDirection.value === 'asc') sortDirection.value = 'desc'
    else if (sortDirection.value === 'desc') {
      sortDirection.value = null
      sortColumn.value = null
    } else sortDirection.value = 'asc'
  } else {
    // Новая колонка - начинаем с ascending
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

// Функция для получения иконки сортировки
const getSortIcon = (column: SortColumn) => {
  if (sortColumn.value === column) {
    return sortDirection.value === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'
  }
  return 'lucide:chevrons-up-down'
}

// Отсортированные продукты
const sortedProducts = computed(() => {
  if (!sortColumn.value || !sortDirection.value) return productsStore.products

  return [...productsStore.products].sort((a, b) => {
    let aValue = a[sortColumn.value as keyof typeof a]
    let bValue = b[sortColumn.value as keyof typeof b]

    // Проверка на undefined
    if (aValue === undefined || bValue === undefined) return 0

    // Преобразование значений в зависимости от типа колонки
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
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="product in sortedProducts" :key="product.id">
          <TableCell>{{ product.id }}</TableCell>
          <TableCell>{{ product.title }}</TableCell>
          <TableCell>{{ product.price }}</TableCell>
          <TableCell>{{ new Date(product.datetime).toLocaleString('ru-RU') }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
