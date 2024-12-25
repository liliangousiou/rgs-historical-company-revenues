import {
    Box,
    Table as MUITable,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Revenue } from 'types';

interface TableProps {
    revenueData: Revenue[];
    loading: boolean;
    handleOpenModal: (category: string) => void;
}

const Table: React.FC<TableProps> = ({
    revenueData,
    loading,
    handleOpenModal,
}) => {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [paginatedData, setPaginatedData] = useState<Revenue[]>([]);

    useEffect(() => {
        const sortedData = [...revenueData].sort((a: Revenue, b: Revenue) => {
            // @ts-ignore
            if (a[sortColumn] < b[sortColumn])
                return sortDirection === 'asc' ? 1 : -1;
            // @ts-ignore
            if (a[sortColumn] > b[sortColumn])
                return sortDirection === 'asc' ? -1 : 1;
            return 0;
        });

        setPaginatedData(
            sortedData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        );
    }, [revenueData, page, rowsPerPage, sortColumn, sortDirection]);

    useEffect(() => {
        setPage(0);
    }, [revenueData]);

    const handleSort = (column: string) => {
        const isAsc = sortColumn === column && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortColumn(column);
        setPage(0);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper>
            <MUITable>
                <TableHead>
                    <TableRow>
                        {Object.keys(revenueData[0] || {}).map(key => (
                            <TableCell key={key}>
                                <TableSortLabel
                                    active={sortColumn === key}
                                    direction={
                                        sortColumn === key
                                            ? sortDirection
                                            : 'asc'
                                    }
                                    onClick={() => handleSort(key)}
                                    sx={{ color: '#0f2417', fontWeight: 700 }}
                                >
                                    {key === 'economic_sector'
                                        ? 'Economic Sector'
                                        : key.charAt(0).toUpperCase() +
                                          key.slice(1)}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!loading && paginatedData.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={
                                    Object.keys(revenueData[0] || {}).length
                                }
                            >
                                <Box
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    height='300px'
                                >
                                    <Typography variant='h6'>
                                        No results found.
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedData.map((row, index) => (
                            <TableRow key={index}>
                                {Object.entries(row).map(([key, value]) => (
                                    <TableCell key={key}>
                                        {key === 'RGS Product Category' ? (
                                            <span
                                                style={{
                                                    cursor: 'pointer',
                                                    color: '#0f2417',
                                                    textDecoration: 'underline',
                                                }}
                                                onClick={() =>
                                                    handleOpenModal(
                                                        value as string,
                                                    )
                                                }
                                            >
                                                {value}
                                            </span>
                                        ) : (
                                            value
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </MUITable>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={revenueData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default Table;
