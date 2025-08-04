import { defineStore } from 'pinia';

interface DashboardState {
    stats: {
        registers: number;
        total_income: number;
        total_payout: number;
    };
    isLoading: boolean;
}

export const useDashboardStore = defineStore('dashboard', {
    state: (): DashboardState => ({
        stats: {
            registers: 0,
            total_income: 0,
            total_payout: 0,
        },
        isLoading: false,
    }),
    actions: {
        async fetchDashboardStats() {
            this.isLoading = true;
            try {
                const response = await useApiFetch('/dashboard/main/blocks');
                // API возвращает данные в response.data
                this.stats = response.data;
            } catch (error) {
                console.error("Ошибка при загрузке статистики:", error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});