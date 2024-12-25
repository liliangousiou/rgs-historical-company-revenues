import {
    BarElement,
    CategoryScale,
    Chart,
    Legend,
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

const YearsBarChart: React.FC<Props> = ({ title, data }) => {
    // Prepare data for the chart
    const years = [...new Set(data.map(item => item.year))].sort(
        (a, b) => a - b,
    );
    const companies = [...new Set(data.map(item => item.company))];

    // Create datasets for each company
    const datasets = companies.map(company => {
        const companyData = data.filter(item => item.company === company);
        const revenues = years.map(year => {
            const yearData = companyData.find(item => item.year === year);
            return yearData ? yearData.revenue : 0; // If no revenue found, return 0
        });

        return {
            label: company,
            data: revenues,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`, // Random color for each company
            borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
            borderWidth: 1,
        };
    });

    const chartData = {
        labels: years,
        datasets: datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${title} - Revenues by Years`,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default YearsBarChart;
