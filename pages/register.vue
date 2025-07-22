<template>
  <div>
    <div class="relative mb-8 text-center">
      <NuxtLink to="/login" class="absolute left-0 top-1/2 -translate-y-1/2 text-secondary-text dark:text-gray-400 hover:text-primary-text dark:hover:text-white transition">
        <Icon name="ph:arrow-left" class="h-6 w-6"/>
      </NuxtLink>
      <h1 class="text-2xl font-bold text-primary-text dark:text-white">Регистрация</h1>
    </div>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <div v-if="step === 'details'">
        <FormInput name="name" label="Ваше имя" placeholder="Введите ваше имя" icon-name="ph:user"/>
        <FormInput name="phone" type="tel" label="Номер телефона" placeholder="+998 (__) ___-__-__" class="mt-4" icon-name="ph:phone"/>
        <FormInput name="password" type="password" label="Придумайте пароль" placeholder="************" class="mt-4" icon-name="ph:lock"/>
        <FormInput name="passwordConfirm" type="password" label="Подтвердите пароль" placeholder="************" class="mt-4" icon-name="ph:lock"/>
        <div class="pt-4">
          <button :disabled="isLoading" type="submit" class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md disabled:opacity-50">
            <span v-if="isLoading">Отправка...</span>
            <span v-else>Получить код</span>
          </button>
        </div>
      </div>

      <div v-if="step === 'confirm'">
        <p class="text-center text-secondary-text dark:text-gray-400">Код отправлен на номер <br> <span class="font-bold text-primary-text dark:text-white">{{ values.phone }}</span></p>
        <FormInput name="code" label="Код из СМС" placeholder="123456" class="mt-4" icon-name="ph:key"/>
        <div class="pt-4">
          <button :disabled="isLoading" type="submit" class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md disabled:opacity-50">
            <span v-if="isLoading">Регистрация...</span>
            <span v-else>Зарегистрироваться</span>
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
const step = ref('details');
const isLoading = ref(false);

const { values, handleSubmit } = useForm({
  validationSchema: object({
    name: string().when('$step', {
      is: 'details',
      then: (schema) => schema.required('Имя обязательно'),
    }),
    phone: string().when('$step', {
      is: 'details',
      then: (schema) => schema.required('Телефон обязателен'),
    }),
    password: string().when('$step', {
      is: 'details',
      then: (schema) => schema.min(8, 'Пароль должен содержать минимум 8 символов').required('Пароль обязателен'),
    }),
    passwordConfirm: string().when('$step', {
      is: 'details',
      then: (schema) => schema.oneOf([yupRef('password')], 'Пароли должны совпадать').required('Подтверждение пароля обязательно')
    }),
    code: string().when('$step', {
      is: 'confirm',
      then: (schema) => schema.required('Код обязателен').min(6, 'Код должен содержать 6 цифр'),
    }),
  }),
  context: { step },
  initialValues: {
    name: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    code: '',
  }
});

const onValidationError = (validationErrors) => {
  const firstError = Object.values(validationErrors.errors)[0];
  toast.warning({ title: 'Ошибка в данных', message: firstError });
};

const handleApiError = (error) => {
  let errorMessage = 'Произошла непредвиденная ошибка.';
  const errorData = error?.data;
  const errorCode = errorData?.code;

  switch (errorCode) {
    case 104:
      errorMessage = 'Ошибка в предоставленных данных. Проверьте правильность ввода.';
      break;
    case 105:
      errorMessage = 'Аккаунт с таким номером телефона уже существует.';
      break;
    default:
      errorMessage = errorData?.message || errorMessage;
  }
  toast.error({ title: 'Ошибка регистрации', message: errorMessage });
};

// Единый обработчик, который вызывает нужную функцию в зависимости от шага
const onSubmit = handleSubmit(async (formValues) => {
  if (step.value === 'details') {
    await handleGetCode(formValues);
  } else {
    await handleRegister(formValues);
  }
}, onValidationError);

// Шаг 1: Запрос кода. Использует /auth/register
async function handleGetCode(formValues) {
  isLoading.value = true;
  try {
    const data = await $fetch('/auth/register', { // <--- Единый эндпоинт
      method: 'POST',
      baseURL: config.public.apiBase,
      // ✅ Безопасная передача данных в теле запроса
      body: {
        name: formValues.name,
        phone: formValues.phone.replace(/\D/g, ''),
        password: formValues.password,
      },
    });

    if (data.code === 200) {
      toast.info({ title: 'Успех', message: data.message || 'Код подтверждения отправлен.' });
      step.value = 'confirm';
    } else {
      handleApiError({ data });
    }
  } catch (error) {
    handleApiError(error);
  } finally {
    isLoading.value = false;
  }
}

// Шаг 2: Финальная регистрация. Также использует /auth/register
async function handleRegister(formValues) {
  isLoading.value = true;
  try {
    const data = await $fetch('/auth/register', { // <--- Единый эндпоинт
      method: 'POST',
      baseURL: config.public.apiBase,
      // ✅ Передаём все данные, как этого требует логика единого эндпоинта
      body: {
        name: formValues.name,
        password: formValues.password,
        code: formValues.code,
        phone: formValues.phone.replace(/\D/g, ''),
      },
    });

    if (data.code === 200) {
      toast.success({ title: 'Отлично!', message: data.message || 'Регистрация прошла успешно.' });
      await navigateTo('/login');
    } else {
      handleApiError({ data });
    }
  } catch (error) {
    handleApiError(error);
  } finally {
    isLoading.value = false;
  }
}
</script>