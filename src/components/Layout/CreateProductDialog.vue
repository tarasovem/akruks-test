<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useProductsStore } from '@/stores/products'
import type { NewProductFormData } from '@/types/NewProductFormData'
import { FormKit } from '@formkit/vue'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const productsStore = useProductsStore()
const isOpen = ref(false)

const createProduct = (formData: NewProductFormData) => {
  const newItem = { ...formData, id: Date.now() }
  productsStore.addProduct(newItem)
  isOpen.value = false
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline">
        <Icon icon="lucide:plus" />
        Добавить
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> Новый товар </DialogTitle>
        <DialogDescription> Добавьте новый товар в список </DialogDescription>
      </DialogHeader>
      <FormKit type="form" @submit="createProduct" submit-label="Сохранить">
        <FormKit
          type="text"
          name="title"
          id="title"
          label="Название"
          validation="required|matches:/^[а-яА-Яa-zA-Z\s]*$/|length:3,255"
          validation-visibility="live"
          :validation-messages="{
            matches: 'Разрешены только буквы русского, английского алфавита и пробелы',
          }"
          :classes="{
            outer: 'max-w-none',
          }"
        />
        <FormKit
          type="number"
          name="price"
          id="price"
          label="Цена"
          validation="required|number|matches:/^\d+(\.\d{2})?$/|min: 0.01"
          :validation-messages="{
            matches: 'Введите целое число или десятичное с точностью до сотых',
            min: 'Цена не может быть меньше 0.01',
          }"
          :number-format="{
            decimals: 2,
            padDecimal: true,
          }"
          step="0.01"
          :classes="{
            outer: 'max-w-none',
          }"
        />
        <FormKit
          type="datetime-local"
          name="datetime"
          id="datetime"
          label="Дата и время"
          validation="required"
          :classes="{
            outer: 'max-w-none',
          }"
        />
      </FormKit>
    </DialogContent>
  </Dialog>
</template>
