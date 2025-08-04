<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <span class="font-bold text-lg uppercase text-primary-text dark:text-white">{{ promocode.promocode }}</span>
        <button @click="copyPromocode" class="text-gray-400 hover:text-gray-600">
          <Icon name="ph:copy-bold" class="h-5 w-5" />
        </button>
      </div>
      <button @click="deletePromocode" class="text-gray-400 hover:text-red-500">
        <Icon name="ph:trash-bold" class="h-5 w-5" />
      </button>
    </div>

    <p class="text-secondary-text dark:text-gray-400 text-sm">{{ promocode.description }}</p>

    <div class="space-y-2 text-sm">
      <div class="flex items-center gap-2 text-secondary-text dark:text-gray-400">
        <Icon name="ph:calendar-blank-bold" class="h-5 w-5" />
        <span>Количество дней: {{ promocode.days }} дней</span>
      </div>
      <div class="flex items-center gap-2 text-secondary-text dark:text-gray-400">
        <Icon name="ph:star-bold" class="h-5 w-5" />
        <span>Количество активаций: <span class="font-bold text-red-500">{{ promocode.activations }}</span></span>
      </div>
      <div class="flex items-center gap-2 text-secondary-text dark:text-gray-400">
        <Icon name="ph:link-bold" class="h-5 w-5" />
        <span>Источник: {{ promocode.source.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  promocode: {
    type: Object,
    required: true,
  },
});

const toast = useToast();

const copyPromocode = () => {
  navigator.clipboard.writeText(props.promocode.promocode);
  toast.info({ title: 'Скопировано!', message: `Промокод ${props.promocode.promocode} скопирован.` });
};

const deletePromocode = () => {
  toast.warning({ title: 'В разработке', message: 'Функция удаления будет добавлена.' });
};
</script>