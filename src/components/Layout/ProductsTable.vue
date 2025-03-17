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

const productsStore = useProductsStore()
</script>

<template>
  <div class="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Название</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead>Дата и время</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="product in productsStore.products" :key="product.id">
          <TableCell>{{ product.id }}</TableCell>
          <TableCell>{{ product.title }}</TableCell>
          <TableCell>{{ product.price }}</TableCell>
          <TableCell>{{ new Date(product.datetime).toLocaleString('ru-RU') }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
