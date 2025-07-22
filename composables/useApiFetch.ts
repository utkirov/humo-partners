// composables/useApiFetch.ts
export const useApiFetch = (path, options = {}) => {
    const config = useRuntimeConfig();
    const authToken = useCookie('auth_token'); // 1. Считываем cookie

    const defaults = {
        baseURL: config.public.apiBase,
        // 2. Проверяем наличие токена и формируем заголовок
        headers: authToken.value
            ? { 'Authorization': `Bearer ${authToken.value}` }
            : {},
        onResponseError({ response }) {
            console.error('API fetch error:', response._data);
        }
    };

    // 3. Отправляем запрос с уже добавленным заголовком
    return $fetch(path, { ...defaults, ...options });
}