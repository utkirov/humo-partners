// plugins/chartjs.ts
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

export default defineNuxtPlugin(() => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        ArcElement,
        Title,
        Tooltip,
        Legend
    );
});