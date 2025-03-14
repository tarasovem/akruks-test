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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { Icon } from '@iconify/vue'
import { toTypedSchema } from '@vee-validate/zod'
import type { SubmissionHandler } from 'vee-validate'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { z } from 'zod'

const { toast } = useToast()

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Название должно содержать минимум 2 символа',
    })
    .max(50, {
      message: 'Название не должно превышать 50 символов',
    }),
  price: z
    .string()
    .min(1, {
      message: 'Укажите цену',
    })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Цена должна быть числом',
    }),
  datetime: z.string().min(1, {
    message: 'Укажите дату и время',
  }),
})

const isDialogOpen = ref(false)

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
})

const onSubmit: SubmissionHandler = (values) => {
  // Здесь будет логика сохранения товара
  console.log(values)

  // Показываем уведомление об успешном добавлении
  toast({
    title: 'Товар добавлен',
    description: `${values.title} успешно добавлен в список`,
    variant: 'default',
  })

  isDialogOpen.value = false
  form.resetForm()
}
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
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
      <Form :form="form" @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <FormField v-slot="{ field }" name="title">
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input v-bind="field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="price">
            <FormItem>
              <FormLabel>Цена ($)</FormLabel>
              <FormControl>
                <Input v-bind="field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="datetime">
            <FormItem>
              <FormLabel>Дата и время</FormLabel>
              <FormControl>
                <Input type="datetime-local" v-bind="field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <DialogFooter>
          <Button type="submit">Сохранить</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>
