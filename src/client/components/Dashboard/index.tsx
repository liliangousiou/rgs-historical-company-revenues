import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import {
    fetchUniqueCompanies,
    fetchUniqueIndustries,
    fetchUniqueSectors,
} from '../../api';
import Revenues from '../Revenues';
import Select from './Select';

const Dashboard: React.FC = () => {
    const [companies, setCompanies] = useState<string[]>([]);
    const [industries, setIndustries] = useState<string[]>([]);
    const [sectors, setSectors] = useState<string[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(
        null,
    );
    const [selectedSector, setSelectedSector] = useState<string | null>(null);

    useEffect(() => {
        const loadCompanies = async () => {
            const data = await fetchUniqueCompanies();
            setCompanies(data);
        };
        const loadIndustries = async () => {
            const data = await fetchUniqueIndustries();
            setIndustries(data);
        };
        const loadSectors = async () => {
            const data = await fetchUniqueSectors();
            setSectors(data);
        };

        loadCompanies();
        loadIndustries();
        loadSectors();
    }, []);

    // Reusable function to handle selection changes
    const handleSelectChange = (
        param: 'company' | 'industry' | 'sector',
        newValue: string | null,
    ) => {
        setSelectedCompany(null);
        setSelectedIndustry(null);
        setSelectedSector(null);
        switch (param) {
            case 'company':
                setSelectedCompany(newValue);
                break;
            case 'industry':
                setSelectedIndustry(newValue);
                break;
            case 'sector':
                setSelectedSector(newValue);
                break;
            default:
                break;
        }
    };

    return (
        <Container sx={{ marginBottom: 2 }}>
            <Typography
                variant='h4'
                color='#0f2417'
                textTransform='uppercase'
                my={4}
                fontFamily='Helvetica'
                fontWeight='300'
            >
                Revenue performance measure dashboard
            </Typography>
            <Box display='flex' gap={2} mb={2}>
                <Box flexBasis='33%'>
                    <Select
                        options={companies}
                        value={selectedCompany}
                        onChange={newValue =>
                            handleSelectChange('company', newValue)
                        }
                        label='Select Company'
                    />
                </Box>
                <Box flexBasis='33%'>
                    <Select
                        options={industries}
                        value={selectedIndustry}
                        onChange={newValue =>
                            handleSelectChange('industry', newValue)
                        }
                        label='Select Industry'
                    />
                </Box>
                <Box flexBasis='33%'>
                    <Select
                        options={sectors}
                        value={selectedSector}
                        onChange={newValue =>
                            handleSelectChange('sector', newValue)
                        }
                        label='Select Sector'
                    />
                </Box>
            </Box>
            <Revenues
                company={selectedCompany}
                industry={selectedIndustry}
                economic_sector={selectedSector}
            />
        </Container>
    );
};

export default Dashboard;
