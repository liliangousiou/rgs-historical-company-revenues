export interface Revenue extends Company {
    ISIN: string;
    'Company Name': string;
    Year: number;
    'RGS Product Category': string;
    'Company Product Category Revenue': number;
    industry?: string;
    economic_sector?: string;
}

export interface ThemeMapping {
    'RGS Product Category': string;
    'Technology Innovation': boolean;
    'Automation/Robotics': boolean;
}

export interface DescriptionMapping {
    'RGS Product Category': string;
    'RGS Product Category Description': string;
}

export interface Company {
    'ISIN code': string;
    dom_country: string;
    economic_sector?: string;
    industry?: string;
}

export interface ProductCategory {
    'RGS Product Category': string;
    'RGS Product Category Description': string;
    'Technology Innovation': boolean;
    'Automation/Robotics': boolean;
}

export type ChartRevenue = {
    year: number;
    company?: string;
    revenue: number;
};
