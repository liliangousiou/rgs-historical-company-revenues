import axios from 'axios';

import { ChartRevenue, ProductCategory, Revenue } from 'types';

import { filterRevenues } from './utils';

const API_URL = 'http://localhost:3000/api';

export const fetchRevenueData = async (): Promise<Revenue[]> => {
    const response = await axios.get<Revenue[]>(`${API_URL}/revenues`);
    return response.data;
};

type RevenueParams = {
    company: string | null;
    industry: string | null;
    economic_sector: string | null;
};

// Fetch revenues all info - sector and industry fields added
// Filter by company, industry or economic sector
export const fetchRevenues = async ({
    company,
    industry,
    economic_sector,
}: RevenueParams): Promise<Revenue[]> => {
    try {
        const response = await axios.get<Revenue[]>(`${API_URL}/revenues`);
        const revenues = response.data;

        // Apply filtering based on provided parameters
        const filteredData = filterRevenues(
            revenues,
            company,
            industry,
            economic_sector,
        );
        return filteredData;
    } catch (error) {
        console.error('Error fetching revenues:', error);
        throw new Error('Could not fetch revenues data.');
    }
};

// Fetch chart data - check if company, industry or economic sector
export const fetchChartData = async ({
    company,
    industry,
    economic_sector,
}: RevenueParams): Promise<ChartRevenue[]> => {
    try {
        const response = await axios.get<Revenue[]>(`${API_URL}/revenues`);
        const revenues = response.data;

        // Apply filtering based on provided parameters
        const filteredData = filterRevenues(
            revenues,
            company,
            industry,
            economic_sector,
        );

        const years = [...new Set(filteredData.map(row => row.Year))].sort(
            (a, b) => a - b,
        );

        let chartData: ChartRevenue[] = [];

        if (company) {
            chartData = years.map(year => {
                const totalRevenue = filteredData
                    .filter(row => row.Year === year)
                    .reduce((sum, row) => {
                        const revenue = Number(
                            row['Company Product Category Revenue'],
                        );
                        return sum + (isNaN(revenue) ? 0 : revenue); // Check if revenue is a number
                    }, 0);

                return { year, revenue: totalRevenue };
            });
        } else {
            const companies = [
                ...new Set(filteredData.map(row => row['Company Name'])),
            ];
            companies.forEach(companyName => {
                years.forEach(year => {
                    const totalRevenue = filteredData
                        .filter(
                            row =>
                                row['Company Name'] === companyName &&
                                row.Year === year,
                        )
                        .reduce((sum, row) => {
                            const revenue = Number(
                                row['Company Product Category Revenue'],
                            );
                            return sum + (isNaN(revenue) ? 0 : revenue);
                        }, 0);

                    chartData.push({
                        year,
                        company: companyName,
                        revenue: totalRevenue,
                    });
                });
            });
        }

        return chartData;
    } catch (error) {
        console.error('Error fetching chart revenues:', error);
        throw new Error('Could not fetch chart revenues data.');
    }
};

// Fetch unique values of companies, industries and sectors
export const fetchUniqueCompanies = async (): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_URL}/unique-companies`);
    return response.data;
};
export const fetchUniqueIndustries = async (): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_URL}/unique-industries`);
    return response.data;
};
export const fetchUniqueSectors = async (): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_URL}/unique-sectors`);
    return response.data;
};

// Fetch RGS Product category description and theming
export const fetchProductCategoryByTitle = async (
    title: string,
): Promise<ProductCategory> => {
    const response = await axios.get<ProductCategory>(
        `${API_URL}/product-category-by-title/${title}`,
    );
    return response.data;
};
