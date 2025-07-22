<template>
  <div class="max-w-md">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <h2 class="text-xl font-bold text-primary-text dark:text-white text-center">Вывод на карту</h2>

        <div class="text-center bg-main-bg dark:bg-gray-700/50 py-4 rounded-xl">
          <p class="text-secondary-text dark:text-gray-400 mb-2">Доступно для вывода</p>
          <p class="text-3xl font-bold text-accent-orange dark:text-white">4 560 000 сум</p>
        </div>

        <FormInput
            name="card_number"
            label="Номер карты"
            placeholder="8600 **** **** ****"
            icon-name="ph:credit-card"
        />

        <FormInput
            name="amount"
            type="number"
            label="Сумма для вывода"
            placeholder="4 560 000 сум"
            icon-name="ph:money"
        />

        <div class="pt-2">
          <button type="submit" class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-opacity-90 transition">
            Оставить заявку
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { object, string, number } from 'yup';
useHead({ title: 'Вывод средств | Humo TV Partners' });

const { handleSubmit } = useForm({
  validationSchema: object({
    card_number: string().required('Номер карты обязателен'),
    amount: number().required('Сумма обязательна').positive('Сумма должна быть положительной'),
  })
});
const onSubmit = handleSubmit(values => { console.log(values); });
</script>