import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import React from 'react';

import { dropdownStyle } from '../Revenues/styles';

interface SelectProps {
    options: string[];
    value: string | null;
    onChange: (newValue: string | null) => void;
    label: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, label }) => {
    return (
        <Autocomplete
            options={options}
            value={value}
            onChange={(_event, newValue) => {
                onChange(newValue);
            }}
            renderInput={params => (
                <TextField {...params} label={label} variant='outlined' />
            )}
            sx={dropdownStyle}
        />
    );
};

export default Select;
