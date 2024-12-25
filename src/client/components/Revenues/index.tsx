import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ChartRevenue, Revenue } from 'types';

import { fetchChartData, fetchRevenues } from '../../api';
import {
    CompaniesBarChart,
    CompanyBarChart,
    CompanyPieChart,
    YearsBarChart,
    YearsPieChart,
} from '../Charts';
import Modal from './Modal';
import Table from './Table';
import {
    companyChartContainerStyle,
    companyChartsContainerStyle,
    containerStyle,
    multiCompanyChartContainerStyle,
} from './styles';

interface RevenuesProps {
    company: string | null;
    industry: string | null;
    economic_sector: string | null;
}

const Revenues: React.FC<RevenuesProps> = ({
    company,
    industry,
    economic_sector,
}) => {
    const [revenueData, setRevenueData] = useState<Revenue[]>([]);
    const [chartData, setChartData] = useState<ChartRevenue[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [chartLoading, setChartLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState<string | null>(null);

    useEffect(() => {
        const loadRevenueData = async () => {
            setLoading(true);
            const data = await fetchRevenues({
                company,
                industry,
                economic_sector,
            });
            setRevenueData(data);
            setLoading(false);
        };
        const loadChartData = async () => {
            setChartLoading(true);
            const chartData = await fetchChartData({
                company,
                industry,
                economic_sector,
            });
            setChartData(chartData);
            setChartLoading(false);
        };

        loadRevenueData();
        if (company || industry || economic_sector) loadChartData();
    }, [company, industry, economic_sector]);

    const handleOpenModal = (category: string) => {
        setModalTitle(category);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setModalTitle(null);
    };

    let chartTitle: string = 'Revenue by year';
    if (company || industry || economic_sector)
        chartTitle = `${company || industry || economic_sector}`;

    return (
        <Box sx={containerStyle}>
            <Table
                revenueData={revenueData}
                loading={loading}
                handleOpenModal={handleOpenModal}
            />

            {!chartLoading && chartData.length && (
                <Box sx={containerStyle}>
                    {company && (
                        <Box sx={companyChartsContainerStyle}>
                            <Paper sx={companyChartContainerStyle}>
                                <CompanyBarChart
                                    title={chartTitle}
                                    data={chartData}
                                />
                            </Paper>
                            <Paper sx={companyChartContainerStyle}>
                                <CompanyPieChart
                                    title={chartTitle}
                                    data={chartData}
                                />
                            </Paper>
                        </Box>
                    )}
                    {(industry || economic_sector) && (
                        <>
                            <Paper sx={multiCompanyChartContainerStyle}>
                                <CompaniesBarChart
                                    title={chartTitle}
                                    data={chartData}
                                />
                            </Paper>
                            <Paper sx={multiCompanyChartContainerStyle}>
                                <YearsBarChart
                                    title={chartTitle}
                                    data={chartData}
                                />
                            </Paper>
                            <Paper sx={multiCompanyChartContainerStyle}>
                                <YearsPieChart
                                    title={chartTitle}
                                    data={chartData}
                                />
                            </Paper>
                        </>
                    )}
                </Box>
            )}

            {modalTitle && (
                <Modal
                    open={open}
                    onClose={handleCloseModal}
                    title={modalTitle}
                />
            )}
        </Box>
    );
};

export default Revenues;
