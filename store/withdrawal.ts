import { defineStore } from 'pinia';

// Определяем, как выглядит объект транзакции или заявки для TypeScript
interface Transaction {
    id: number;
    // ... другие поля
}

interface WithdrawalState {
    balance: number;
    tickets: Transaction[];
    transactions: Transaction[];
    isLoadingBalance: boolean;
    isLoadingHistory: boolean;
}

export const useWithdrawalStore = defineStore('withdrawal', {
    // 1. СОСТОЯНИЕ (STATE): Здесь хранятся все наши данные
    state: (): WithdrawalState => ({
        balance: 0,
        tickets: [],
        transactions: [],
        isLoadingBalance: false,
        isLoadingHistory: false,
    }),

    // 2. ДЕЙСТВИЯ (ACTIONS): Функции для изменения состояния
    actions: {
        // Загрузка доступного баланса
        async fetchBalance() {
            this.isLoadingBalance = true;
            try {
                const response = await useApiFetch('/dashboard/withdrawals/available');
                // ✨ ИСПРАВЛЕНО: Получаем баланс из response.data.available
                this.balance = response.data?.available || 0;
            } catch (error) {
                console.error("Ошибка при загрузке баланса:", error);
                this.balance = 0;
            } finally {
                this.isLoadingBalance = false;
            }
        },

        // Создание заявки на вывод
        async createWithdrawalTicket(payload: { amount: number, card_number: string }) {
            // Эта функция не меняет состояние напрямую, а просто выполняет запрос
            // и возвращает результат, чтобы компонент мог показать toast
            return useApiFetch('/dashboard/withdrawals/ticket', {
                method: 'POST',
                body: payload,
            });
        },

        // Загрузка истории заявок (tickets)
        async fetchTickets() {
            this.isLoadingHistory = true;
            try {
                const response = await useApiFetch('/dashboard/withdrawals/tickets?lang=ru&type=close');
                this.tickets = response.data?.list || [];
            } catch (error) {
                console.error("Ошибка при загрузке заявок:", error);
                this.tickets = [];
            } finally {
                this.isLoadingHistory = false;
            }
        },

        // Загрузка истории транзакций
        async fetchTransactions() {
            this.isLoadingHistory = true;
            try {
                const response = await useApiFetch('/dashboard/withdrawals/transactions');
                this.transactions = response.data?.list || [];
            } catch (error) {
                console.error("Ошибка при загрузке транзакций:", error);
                this.transactions = [];
            } finally {
                this.isLoadingHistory = false;
            }
        },
    },
});