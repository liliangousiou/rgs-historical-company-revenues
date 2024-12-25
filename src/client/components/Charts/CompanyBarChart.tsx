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
import { Bar } from 'react-chartjs-2';

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

const CompanyBarChart: React.FC<Props> = ({ title, data }) => {
    const years = data.map(item => item.year);
    const revenues = data.map(item => item.revenue);

    const chartData = {
        labels: years,
        datasets: [
            {
                type: 'bar' as const, // Bar chart for company revenue
                data: revenues,
                backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`, // Random color for each year
                borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
                borderWidth: 1,
                label: 'Revenue',
            },
        ],
    };

    // Chart options configuration
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default CompanyBarChart;
