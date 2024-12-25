import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import checkmark from '../../assets/checkmark.svg';
import close from '../../assets/close.svg';

import { ProductCategory } from 'types';

import { fetchProductCategoryByTitle } from '../../api';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title }) => {
    const [productCategory, setProductCategory] =
        useState<ProductCategory | null>(null);

    useEffect(() => {
        const loadCategoryData = async () => {
            if (title) {
                try {
                    const fetchedData =
                        await fetchProductCategoryByTitle(title);
                    setProductCategory({ ...fetchedData });
                } catch (error) {
                    console.error(
                        'Error fetching product category data:',
                        error,
                    );
                    setProductCategory(null);
                }
            }
        };

        loadCategoryData();
    }, [title]); // Dependency on title to refetch when it changes

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle display='flex' justifyContent='space-between'>
                {title}
                <img
                    onClick={onClose}
                    src={close}
                    width={35}
                    height={35}
                    style={{ cursor: 'pointer' }}
                />
            </DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 3,
                }}
            >
                {productCategory?.['RGS Product Category Description'] && (
                    <Typography flex={1} mt={1}>
                        {productCategory?.['RGS Product Category Description']}
                    </Typography>
                )}

                <Box
                    display='flex'
                    justifyContent='space-between'
                    gap={2}
                    mt={2}
                >
                    {productCategory?.['Technology Innovation'] && (
                        <Box display='flex' flexBasis='50%' minWidth='220px'>
                            <Typography lineHeight={2.5}>
                                Technology Innovation
                            </Typography>
                            <img src={checkmark} width={35} height={35} />
                        </Box>
                    )}
                    {productCategory?.['Automation/Robotics'] && (
                        <Box display='flex' flexBasis='50%' minWidth='220px'>
                            <Typography lineHeight={2.5}>
                                Automation/Robotics
                            </Typography>
                            <img src={checkmark} width={35} height={35} />
                        </Box>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
