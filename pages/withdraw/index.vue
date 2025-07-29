<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
    <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8">
      <h2 class="text-xl font-bold text-primary-text dark:text-white mb-1">Создать заявку</h2>
      <p class="text-secondary-text dark:text-gray-400 mb-6">Средства поступят на карту в течение 24 часов.</p>

      <form @submit.prevent="handleWithdraw" class="space-y-5">
        <div>
          <label for="amount" class="block text-sm font-medium text-primary-text dark:text-gray-300 mb-2">Сумма вывода (UZS)</label>
          <input v-model="form.amount" type="number" id="amount" placeholder="Введите сумму (минимум 1000)" class="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg p-3" required />
        </div>
        <div>
          <label for="card_number" class="block text-sm font-medium text-primary-text dark:text-gray-300 mb-2">Номер карты (UZCARD / HUMO)</label>
          <input v-model="form.card_number" type="text" id="card_number" placeholder="8600 **** **** ****" class="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg p-3" required />
        </div>
        <div class="pt-2">
          <button :disabled="isSubmitting" type="submit" class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md disabled:opacity-50">
            <span v-if="isSubmitting">Отправка...</span>
            <span v-else>Отправить заявку</span>
          </button>
        </div>
      </form>
    </div>

    <div class="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col justify-center text-center">
      <h3 class="text-lg text-secondary-text dark:text-gray-400 mb-2">Доступно к выводу</h3>
      <p v-if="isLoadingBalance" class="text-4xl font-extrabold text-primary-text dark:text-white">Загрузка...</p>
      <p v-else class="text-4xl font-extrabold text-primary-text dark:text-white">
        {{ balance.toLocaleString('fr-FR') }} UZS
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useWithdrawalStore } from '~/store/withdrawal';

useHead({ title: 'Вывод средств | Humo TV Partners' });

const toast = useToast();
const withdrawalStore = useWithdrawalStore();
const { balance, isLoadingBalance } = storeToRefs(withdrawalStore);
const { fetchBalance, createWithdrawalTicket } = withdrawalStore;

const form = reactive({ amount: null, card_number: '' });
const isSubmitting = ref(false);

async function handleWithdraw() {
  if (form.amount < 1000) {
    toast.warning({ title: 'Ошибка ввода', message: 'Минимальная сумма для вывода - 1000 UZS.' });
    return;
  }
  if (!form.amount || !form.card_number || form.card_number.length < 16) {
    toast.warning({ title: 'Ошибка ввода', message: 'Пожалуйста, заполните все поля корректно.' });
    return;
  }
  if (form.amount > balance.value) {
    toast.warning({ title: 'Недостаточно средств', message: 'Сумма вывода не может превышать доступный баланс.'});
    return;
  }

  isSubmitting.value = true;
  try {
    await createWithdrawalTicket({
      amount: form.amount,
      card_number: form.card_number.replace(/\s/g, ''),
    });

    toast.success({ title: 'Успех!', message: 'Ваша заявка на вывод средств принята.' });

    // ✨ Очищаем старый список заявок, чтобы он обновился на следующей странице
    withdrawalStore.tickets = [];

    await navigateTo('/withdraw/requests');

  } catch (error) {
    const message = error.data?.message || 'Произошла ошибка при отправке заявки.';
    toast.error({ title: 'Ошибка', message });
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(fetchBalance);
</script>