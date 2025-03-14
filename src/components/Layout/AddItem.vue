<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import * as z from 'zod'

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2, 'Название должно быть не менее 2 символов'),
    price: z.number().min(0, 'Цена не может быть отрицательной'),
    datetime: z
      .string()
      .regex(
        /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}:\d{2}$/,
        'Неверный формат даты (дд.мм.гггг чч:мм:сс)',
      ),
  }),
)

function onSubmit(values: Record<string, any>) {
  const formData = values as { title: string; price: number; datetime: string }
  // Используйте formData для работы с store
  toast({
    title: 'Данные успешно сохранены:',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(formData, null, 2)),
    ),
  })
}
</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline">Добавить элемент</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создание нового элемента</DialogTitle>
          <DialogDescription> Заполните все поля для добавления нового элемента </DialogDescription>
        </DialogHeader>

        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <!-- Поле для названия -->
          <FormField v-slot="{ componentField }" name="title">
            <FormItem class="mb-4">
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Введите название" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Поле для цены -->
          <FormField v-slot="{ componentField }" name="price">
            <FormItem class="mb-4">
              <FormLabel>Цена ($)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" v-bind="componentField" />
              </FormControl>
              <FormDescription>Укажите сумму в долларах</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Поле для даты и времени -->
          <FormField v-slot="{ componentField }" name="datetime">
            <FormItem class="mb-4">
              <FormLabel>Дата и время</FormLabel>
              <FormControl>
                <Input type="text" placeholder="дд.мм.гггг чч:мм:сс" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>

        <DialogFooter>
          <Button type="submit" form="dialogForm">Создать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>
