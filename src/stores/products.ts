import type { NewProductFormData } from '@/types/NewProductFormData'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref<NewProductFormData[]>([])

  const addProduct = (product: NewProductFormData) => {
    products.value.push(product)
    // Сохраняем в localStorage для персистентности
    localStorage.setItem('products', JSON.stringify(products.value))
  }

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      products.value = JSON.parse(savedProducts)
    }
  }

  return {
    products,
    addProduct,
    loadProducts,
  }
})
