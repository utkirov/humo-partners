import { defineStore } from 'pinia';

interface Promocode {
    id: number;
    promocode: string;
    description: string;
    days: number;
    activations: number;
    source: {
        id: number;
        name: string;
    };
}

// ✨ Новый интерфейс для заявок в ожидании
interface PendingSource {
    id: number;
    status: string;
    data: string; // Судя по API, это дата
}

interface SourceState {
    activePromocodes: Promocode[];
    // ✨ Типизируем массив с заявками
    pendingSources: PendingSource[];
    sourceTypes: any[];
    isLoading: boolean;
}

export const useSourceStore = defineStore('source', {
    state: (): SourceState => ({
        activePromocodes: [],
        pendingSources: [],
        sourceTypes: [],
        isLoading: false,
    }),

    actions: {
        async fetchActivePromocodes() {
            this.isLoading = true;
            try {
                const response = await useApiFetch('/dashboard/sources/actives');
                this.activePromocodes = response.data || [];
            } catch (error) {
                console.error("Ошибка при загрузке промокодов:", error);
                this.activePromocodes = [];
            } finally {
                this.isLoading = false;
            }
        },

        async fetchPendingSources() {
            this.isLoading = true;
            try {
                const response = await useApiFetch('/dashboard/sources/pending');
                // ✨ API возвращает массив напрямую в data
                this.pendingSources = response.data || [];
            } catch (error) {
                console.error("Ошибка при загрузке ожидающих источников:", error);
                this.pendingSources = [];
            } finally {
                this.isLoading = false;
            }
        },

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

        async addSource(payload: { type_id: number; url: string; description: string }) {
            return useApiFetch('/dashboard/sources/add', {
                method: 'POST',
                body: payload,
            });
        },
    },
});