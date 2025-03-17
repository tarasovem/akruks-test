<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useProductsStore } from '@/stores/products'
import type { NewProductFormData } from '@/types/NewProductFormData'
import { FormKit } from '@formkit/vue'
import { reactive, ref } from 'vue'

const productsStore = useProductsStore()
const isOpen = ref(false)
const productId = ref<number | null>(null)
const formData = reactive<NewProductFormData>({
  title: '',
  price: 0,
  datetime: '',
})

const updateProduct = (data: NewProductFormData) => {
  if (productId.value) {
    const updatedProduct = { ...data, id: productId.value }
    productsStore.updateProduct(updatedProduct)
    isOpen.value = false
  }
}

const open = (id: number) => {
  productId.value = id
  const product = productsStore.getProductById(id)

  if (product) {
    formData.title = product.title
    formData.price = product.price
    formData.datetime = product.datetime
    isOpen.value = true
  }
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Редактирование товара</DialogTitle>
        <DialogDescription>Измените данные товара</DialogDescription>
      </DialogHeader>
      <FormKit type="form" @submit="updateProduct" submit-label="Сохранить" :value="formData">
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
