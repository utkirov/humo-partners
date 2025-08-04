<template>
  <div>
    <div class="relative mb-8 text-center">
      <button @click="goBack" v-if="step !== 'phone'" class="absolute left-0 top-1/2 -translate-y-1/2 text-secondary-text dark:text-gray-400 hover:text-primary-text dark:hover:text-white transition">
        <Icon name="ph:arrow-left" class="h-6 w-6"/>
      </button>
      <h1 class="text-2xl font-bold text-primary-text dark:text-white">Регистрация</h1>
    </div>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <div v-if="step === 'phone'">
        <p class="text-center text-secondary-text dark:text-gray-400 mb-4">Введите ваш номер телефона для получения кода подтверждения.</p>
        <FormInput name="phone" type="tel" label="Номер телефона" placeholder="+998 (__) ___-__-__" icon-name="ph:phone"/>
        <div class="pt-4">
          <button :disabled="isLoading" type="submit" class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md disabled:opacity-50">
            <span v-if="isLoading">Отправка...</span>
            <span v-else>Получить код</span>
          </button>
        </div>
      </div>

      <div v-if="step === 'sms'">
        <p class="text-center text-secondary-text dark:text-gray-400">Код отправлен на номер <br> <span class="font-bold text-primary-text dark:text-white">{{ values.phone }}</span></p>
        <FormInput name="sms_code" label="Код из СМС" placeholder="123456" class="mt-4" icon-name="ph:key"/>
        <div class="pt-4">
          <button :disabled="isLoading" type="submit" class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md disabled:opacity-50">
            <span v-if="isLoading">Проверка...</span>
            <span v-else>Подтвердить код</span>
          </button>
        </div>
      </div>

      <div v-if="step === 'data'">
        <p class="text-center text-secondary-text dark:text-gray-400 mb-4">Отлично! Теперь введите ваше имя и придумайте пароль.</p>
        <FormInput name="name" label="Ваше имя" placeholder="Введите ваше имя" icon-name="ph:user"/>
        <FormInput name="password" type="password" label="Придумайте пароль" placeholder="************" class="mt-4" icon-name="ph:lock"/>
        <FormInput name="passwordConfirm" type="password" label="Подтвердите пароль" placeholder="************" class="mt-4" icon-name="ph:lock"/>
        <div class="pt-4">
          <button :disabled="isLoading" type="submit" class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md disabled:opacity-50">
            <span v-if="isLoading">Регистрация...</span>
            <span v-else>Зарегистрироваться и войти</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { object, string, ref as yupRef } from 'yup';

definePageMeta({ layout: 'auth' });
useHead({ title: 'Регистрация | Humo TV Partners' });

const toast = useToast();
const config = useRuntimeConfig();

// ❗️ Используем `MapsTo` для редиректа, поэтому убираем `useRouter`
// const router = useRouter();

const step = ref('phone');
const isLoading = ref(false);
const registerToken = ref(null);

const validationSchema = computed(() => {
  return object({
    phone: string().when('$step', {
      is: 'phone',
      then: (schema) => schema.required('Телефон обязателен'),
    }),
    sms_code: string().when('$step', {
      is: 'sms',
      then: (schema) => schema.required('Код обязателен').min(6, 'Код должен содержать 6 цифр'),
    }),
    name: string().when('$step', {
      is: 'data',
      then: (schema) => schema.required('Имя обязательно'),
    }),
    password: string().when('$step', {
      is: 'data',
      then: (schema) => schema.min(8, 'Пароль должен содержать минимум 8 символов').required('Пароль обязателен'),
    }),
    passwordConfirm: string().when('$step', {
      is: 'data',
      then: (schema) => schema.oneOf([yupRef('password')], 'Пароли должны совпадать').required('Подтверждение пароля обязательно')
    }),
  });
});

const { values, handleSubmit } = useForm({
  validationSchema: validationSchema,
  context: { step },
});

const onSubmit = handleSubmit(async (formValues) => {
  isLoading.value = true;
  try {
    switch (step.value) {
      case 'phone':
        await handlePhoneSubmit(formValues);
        break;
      case 'sms':
        await handleSmsSubmit(formValues);
        break;
      case 'data':
        await handleDataSubmit(formValues);
        break;
    }
  } catch (error) {
    handleApiError(error.data);
  } finally {
    isLoading.value = false;
  }
}, (validationErrors) => {
  const firstError = Object.values(validationErrors.errors)[0];
  toast.warning({ title: 'Ошибка в данных', message: firstError });
});

async function handlePhoneSubmit(formValues) {
  const queryParams = new URLSearchParams({ phone: formValues.phone.replace(/\D/g, '') });
  const data = await $fetch(`/auth/register/step/number?${queryParams.toString()}`, {
    method: 'POST',
    baseURL: config.public.apiBase,
  });
  if (data.code === 200 && data.data.register_token) {
    registerToken.value = data.data.register_token;
    step.value = 'sms';
    toast.info({ title: 'Код отправлен', message: data.message });
  } else {
    handleApiError(data);
  }
}

async function handleSmsSubmit(formValues) {
  const queryParams = new URLSearchParams({
    register_token: registerToken.value,
    sms_code: formValues.sms_code,
  });
  const data = await $fetch(`/auth/register/step/sms-code?${queryParams.toString()}`, {
    method: 'POST',
    baseURL: config.public.apiBase,
  });

  if (data.code === 200 && data.data.register_token) {
    registerToken.value = data.data.register_token;
    step.value = 'data';
    toast.info({ title: 'Код подтвержден', message: 'Теперь введите ваши данные.' });
  } else {
    handleApiError(data);
  }
}

// Шаг 3: Финальная регистрация с автоматическим входом
async function handleDataSubmit(formValues) {
  const queryParams = new URLSearchParams({
    register_token: registerToken.value,
    name: formValues.name,
    password: formValues.password,
  });
  const data = await $fetch(`/auth/register/step/data?${queryParams.toString()}`, {
    method: 'POST',
    baseURL: config.public.apiBase,
  });

  // ❗️ Ключевое изменение: Проверяем наличие токена в ответе
  if (data.code === 200 && data.data && data.data.token) {
    // Используем тот же метод, что и в login.vue для сохранения токена
    useCookie('auth_token', {maxAge: 60 * 60 * 24}).value = data.data.token;
    toast.success({ title: 'Отлично!', message: 'Регистрация прошла успешно!' });
    // Перенаправляем на главную страницу, а не на /login
    await navigateTo('/');
  } else if (data.code === 200) {
    // Запасной вариант на случай, если API не вернул токен
    toast.success({ title: 'Отлично!', message: 'Регистрация прошла успешно. Теперь вы можете войти.' });
    await navigateTo('/login');
  } else {
    handleApiError(data);
  }
}

function handleApiError(errorData) {
  const errorMessage = errorData?.message || 'Произошла непредвиденная ошибка.';
  toast.error({ title: 'Ошибка регистрации', message: errorMessage });
}

function goBack() {
  if (step.value === 'sms') {
    step.value = 'phone';
  } else if (step.value === 'data') {
    step.value = 'sms';
  }
}
</script>