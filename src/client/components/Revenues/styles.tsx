import { SxProps } from '@mui/material';

export const dropdownStyle: SxProps = {
    input: { color: '#0f2417', fontWeight: 500 },
    '.MuiOutlinedInput-root': { backgroundColor: 'white' },
    'label.Mui-focused': { color: '#0f2417' },
    fieldset: { borderColor: 'white' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0f2417',
    },
    '.Mui-focused .MuiAutocomplete-clearIndicator svg': {
        width: '18px',
        height: '18px',
    },
    svg: { color: '#0f2417' },
};

export const containerStyle: SxProps = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    rowGap: 2,
    columnGap: 2,
};

export const companyChartsContainerStyle: SxProps = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '0 auto',
    rowGap: 2,
    columnGap: 2,
};

export const companyChartContainerStyle: SxProps = {
    padding: '20px',
    minWidth: '568px',
    flex: '1',
    boxSizing: 'border-box',
    textAlign: 'center',
};

export const chartContainerStyle: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 2,
};

export const multiCompanyChartContainerStyle: SxProps = {
    ...companyChartContainerStyle,
    flexBasis: '100%',
};
