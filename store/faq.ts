import { defineStore } from 'pinia';

// ✨ ИСПРАВЛЕНО: Интерфейс соответствует структуре API
interface Faq {
    id: number;
    name: string; // было question
    text: string; // было answer
}

interface FaqState {
    faqs: Faq[];
    isLoading: boolean;
    page: number;
    hasMore: boolean;
}

export const useFaqStore = defineStore('faq', {
    state: (): FaqState => ({
        faqs: [],
        isLoading: false,
        page: 1,
        hasMore: true,
    }),
    actions: {
        async fetchFaqs() {
            if (this.isLoading || !this.hasMore) return;
            this.isLoading = true;
            try {
                const response = await useApiFetch('/dashboard/faq', {
                    params: {
                        lang: 'ru',
                        page: this.page,
                    },
                });

                const newFaqs = response.data?.list || [];

                if (newFaqs.length > 0) {
                    this.faqs.push(...newFaqs);
                    this.hasMore = response.data.currentPage < response.data.lastPage;
                    this.page++;
                } else {
                    this.hasMore = false;
                }
            } catch (error) {
                console.error("Failed to fetch FAQs:", error);
                this.hasMore = false;
            } finally {
                this.isLoading = false;
            }
        },
    },
});