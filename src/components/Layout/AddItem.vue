<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icon } from '@iconify/vue'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        <Icon icon="lucide:plus" />
        Добавить
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> Добавить товар </DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="title"> Название </Label>
          <Input id="title" class="col-span-3" />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="price"> Цена ($) </Label>
          <Input id="price" class="col-span-3" />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="datetime">Дата и время</Label>
          <Input type="datetime-local" id="datetime" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit"> Сохранить </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
