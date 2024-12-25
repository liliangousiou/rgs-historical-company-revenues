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

const CompaniesBarChart: React.FC<Props> = ({ title, data }) => {
    // Prepare data for the chart
    const years = [...new Set(data.map(item => item.year))].sort(
        (a, b) => a - b,
    );
    const companies = [...new Set(data.map(item => item.company))];

    // Create datasets for each year
    const datasets = years.map(year => {
        const yearData = data.filter(item => item.year === year);
        const revenues = companies.map(company => {
            const companyData = yearData.find(item => item.company === company);
            return companyData ? companyData.revenue : 0; // If no revenue found, return 0
        });

        return {
            label: `${year}`,
            data: revenues,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`, // Random color for each year
            borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
            borderWidth: 1,
        };
    });

    const chartData = {
        labels: companies,
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
                text: `${title} - Revenues by Companies`,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default CompaniesBarChart;
