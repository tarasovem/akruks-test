import type { NewProductFormData } from '@/types/NewProductFormData'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref<NewProductFormData[]>([])

  const addProduct = (product: NewProductFormData) => {
    products.value.push(product)
    localStorage.setItem('products', JSON.stringify(products.value))
  }

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      products.value = JSON.parse(savedProducts)
    }
  }

  const removeProduct = (id: number) => {
    products.value = products.value.filter((product) => product.id !== id)
    localStorage.setItem('products', JSON.stringify(products.value))
  }

  const updateProduct = (updatedProduct: NewProductFormData) => {
    const index = products.value.findIndex((product) => product.id === updatedProduct.id)
    if (index !== -1) {
      products.value[index] = updatedProduct
      localStorage.setItem('products', JSON.stringify(products.value))
      return true
    }
    return false
  }

  const getProductById = (id: number) => {
    return products.value.find((product) => product.id === id)
  }

  return {
    products,
    addProduct,
    loadProducts,
    removeProduct,
    updateProduct,
    getProductById,
  }
})
