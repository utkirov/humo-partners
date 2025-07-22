<template>
  <div>
    <h1 class="text-2xl font-bold text-primary-text dark:text-white text-center mb-2">Авторизация</h1>
    <p class="text-center text-secondary-text dark:text-gray-400 mb-8">Введите номер телефона и пароль</p>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <FormInput
          name="phone"
          type="tel"
          placeholder="998XXXXXXXXX"
          icon-name="ph:user"
      />
      <FormInput
          name="password"
          type="password"
          placeholder="************"
          icon-name="ph:lock"
      />

      <div class="flex flex-col gap-2 pt-2">
        <button :disabled="isLoading" type="submit"
                class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="isLoading">Обработка...</span>
          <span v-else>Войти</span>
        </button>

        <NuxtLink to="/register"
                  class="block text-center w-full text-accent-orange font-bold py-3 px-4 rounded-xl hover:bg-accent-orange/10 transition-colors duration-200">
          <span>Регистрация</span>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { object, string } from 'yup';
definePageMeta({ layout: 'auth' });
useHead({ title: 'Авторизация | Humo TV Partners' });

const toast = useToast();
const config = useRuntimeConfig();
const isLoading = ref(false);

const { handleSubmit } = useForm({
  validationSchema: object({
    phone: string().required('Поле "Телефон" не может быть пустым'),
    password: string().required('Поле "Пароль" не может быть пустым'),
  }),
});

const handleError = (errorData) => {
  let errorMessage = 'Произошла непредвиденная ошибка.';
  const errorCode = errorData?.code;

  switch (errorCode) {
    case 101:
      errorMessage = 'Поля "Телефон" и "Пароль" обязательны.';
      break;
    case 102:
      errorMessage = 'Аккаунт с указанным номером не найден.';
      break;
    case 103:
      errorMessage = 'Введен неверный пароль.';
      break;
    default:
      errorMessage = errorData?.message || errorMessage;
  }

  toast.error({title: 'Ошибка входа', message: errorMessage});
}

const onSubmit = handleSubmit(
    async (values) => {
      isLoading.value = true;
      try {
        const queryParams = new URLSearchParams({
          phone: values.phone.replace(/\D/g, ''),
          password: values.password
        });

        const data = await $fetch(`/auth/login?${queryParams.toString()}`, {
          baseURL: config.public.apiBase,
          method: 'POST',
        });

        if (data.data && data.data.token) {
          useCookie('auth_token', {maxAge: 60 * 60 * 24}).value = data.data.token;
          toast.success({title: 'Успех', message: 'Авторизация прошла успешно.'});
          await navigateTo('/');
        } else {
          handleError(data);
        }
      } catch (error) {
        handleError(error.data);
      } finally {
        isLoading.value = false;
      }
    },
    (validationErrors) => {
      const firstError = Object.values(validationErrors.errors)[0];
      toast.warning({title: 'Проверка данных', message: firstError});
    }
);
</script>