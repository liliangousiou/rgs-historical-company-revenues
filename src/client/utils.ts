import { Revenue } from 'types';

export const filterRevenues = (
    revenues: Revenue[],
    company: string | null,
    industry: string | null,
    economic_sector: string | null,
) => {
    return company
        ? revenues.filter(row => row['Company Name'] === company)
        : industry
          ? revenues.filter(row => row.industry === industry)
          : economic_sector
            ? revenues.filter(row => row.economic_sector === economic_sector)
            : revenues;
};
