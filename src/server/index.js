import cors from 'cors';
import csv from 'csv-parser';
import express from 'express';
import { createReadStream } from 'fs';

const app = express();

const CSV_PATH = 'src/server/data';
const PORT = process.env.PORT || 3000;

app.use(cors());

// Arrays to hold the parsed CSV data
const revenueData = [];
const themesMapping = [];
const descriptionsMapping = [];
const companiesData = [];
const mergedRenevuesInfo = [];

// Function to load and parse the CSV files
const loadCSVs = () => {
    // Load revenues from CSV
    createReadStream(`${CSV_PATH}/product_category_level_revenues.csv`)
        .pipe(csv())
        .on('data', row => revenueData.push(row))
        .on('end', () => {
            console.log('Revenue CSV file successfully processed');
            mergeRenevuesInfo(); // Call mergeRenevuesInfo after loading revenueData
        });

    // Load themes mapping from CSV
    createReadStream(`${CSV_PATH}/product_categories_to_themes_mapping.csv`)
        .pipe(csv())
        .on('data', row => themesMapping.push(row))
        .on('end', () =>
            console.log('Themes Mapping CSV file successfully processed'),
        );

    // Load description mapping from CSV
    createReadStream(
        `${CSV_PATH}/product_categories_to_description_mapping.csv`,
    )
        .pipe(csv())
        .on('data', row => descriptionsMapping.push(row))
        .on('end', () =>
            console.log('Description mapping CSV file successfully processed'),
        );

    // Load companies data from CSV
    createReadStream(
        `${CSV_PATH}/company_to_sector_country_industry_mapping.csv`,
    )
        .pipe(csv())
        .on('data', row => companiesData.push(row))
        .on('end', () => {
            console.log('Companies data CSV file successfully processed');
            mergeRenevuesInfo(); // Call mergeRenevuesInfo after loading companiesData
        });
};

// Load the CSV data when the server starts
loadCSVs();

// Function to merge revenueData with companiesData
const mergeRenevuesInfo = () => {
    revenueData.forEach(revenue => {
        const company = companiesData.find(
            company => company['ISIN code'] === revenue.ISIN,
        );

        if (company) {
            mergedRenevuesInfo.push({
                ...revenue,
                industry: company.industry, // Merging company industry into revenue record
                economic_sector: company.economic_sector, // Merging company economic sector into revenue record
            });
        }
    });
};

// GET endpoint to retrieve revenues with industry and sector fields
app.get('/api/revenues', (_req, res) => {
    res.json(mergedRenevuesInfo);
});

// GET endpoint to retrieve unique companies
app.get('/api/unique-companies', (_req, res) => {
    const uniqueCompanies = [
        ...new Set(revenueData.map(item => item['Company Name'])),
    ];
    res.json(uniqueCompanies);
});

// GET endpoint to retrieve unique industries
app.get('/api/unique-industries', (_req, res) => {
    const uniqueIndustries = [
        ...new Set(companiesData.map(item => item.industry)),
    ];
    res.json(uniqueIndustries);
});

// GET endpoint to retrieve unique sectors
app.get('/api/unique-sectors', (_req, res) => {
    const uniqueSectors = [
        ...new Set(companiesData.map(item => item.economic_sector)),
    ];
    res.json(uniqueSectors);
});

// GET endpoint to retrieve RGS product category description and theming by title
app.get('/api/product-category-by-title/:title', (req, res) => {
    const title = req.params.title;
    const productCategory = {
        'RGS Product Category': title,
        'RGS Product Category Description': '',
        'Technology Innovation': '',
        'Automation/Robotics': false,
    };

    const description = descriptionsMapping.find(
        item => item['RGS Product Category'] === title,
    );
    if (description)
        productCategory['RGS Product Category Description'] =
            description['RGS Product Category Description'];

    const theming = themesMapping.find(
        item => item['RGS Product Category'] === title,
    );
    if (theming) {
        productCategory['Technology Innovation'] =
            theming['Technology Innovation'];
        productCategory['Automation/Robotics'] = theming['Automation/Robotics'];
    }

    res.json(productCategory);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
