import { defineStore } from 'pinia';

// Описываем типы данных для строгой типизации
interface Source {
    id: number;
    url: string;
    description: string;
    // ... другие поля
}

interface SourceType {
    id: number;
    name: string;
    // ... другие поля
}

interface SourceState {
    activeSources: Source[];
    pendingSources: Source[];
    sourceTypes: SourceType[];
    isLoading: boolean;
}

export const useSourceStore = defineStore('source', {
    // 1. СОСТОЯНИЕ (STATE): Хранит все данные, связанные с источниками
    state: (): SourceState => ({
        activeSources: [],
        pendingSources: [],
        sourceTypes: [],
        isLoading: false, // Единый флаг загрузки для простоты
    }),

    // 2. ДЕЙСТВИЯ (ACTIONS): Функции для работы с API и изменения состояния
    actions: {
        // Загрузка активных источников
        async fetchActiveSources() {
            this.isLoading = true;
            try {
                const response = await useApiFetch('/dashboard/sources/actives');
                // Предполагается, что API возвращает { data: [...] }
                this.activeSources = response.data || response;
            } catch (error) {
                console.error("Ошибка при загрузке активных источников:", error);
                this.activeSources = []; // В случае ошибки сбрасываем массив
            } finally {
                this.isLoading = false;
            }
        },

        // Загрузка источников в ожидании
        async fetchPendingSources() {
            this.isLoading = true;
            try {
                const response = await useApiFetch('/dashboard/sources/pending');
                this.pendingSources = response.data || response;
            } catch (error) {
                console.error("Ошибка при загрузке ожидающих источников:", error);
                this.pendingSources = [];
            } finally {
                this.isLoading = false;
            }
        },

        // Загрузка типов источников (для формы добавления)
        async fetchSourceTypes() {
            this.isLoading = true;
            try {
                const response = await useApiFetch('/dashboard/sources/types');
                this.sourceTypes = response.data || response;
            } catch (error) {
                console.error("Ошибка при загрузке типов источников:", error);
                this.sourceTypes = [];
            } finally {
                this.isLoading = false;
            }
        },

        // Добавление нового источника
        async addSource(payload: { type_id: number; url: string; description: string }) {
            // Это действие возвращает промис, чтобы компонент мог обработать результат
            return useApiFetch('/dashboard/sources/add', {
                method: 'POST',
                body: payload,
            });
        },
    },
});