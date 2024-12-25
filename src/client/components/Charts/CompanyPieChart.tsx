import {
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    LineElement,
    LinearScale,
    Title,
    Tooltip,
    registerables,
} from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

import { ChartRevenue } from 'types';

Chart.register(
    CategoryScale,
    LinearScale,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ...registerables,
);

interface Props {
    title: string;
    data: ChartRevenue[];
}

const CompanyPieChart: React.FC<Props> = ({ title, data }) => {
    const years = data.map(item => item.year);
    const revenues = data.map(item => item.revenue);

    const chartData = {
        labels: years,
        datasets: [
            {
                type: 'pie' as const, // Pie chart for revenue
                data: revenues,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options configuration
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${title} - Revenue by year`,
            },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default CompanyPieChart;
