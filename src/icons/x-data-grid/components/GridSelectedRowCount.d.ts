import * as React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
interface SelectedRowCountProps {
    selectedRowCount: number;
}
declare const GridSelectedRowCount: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & SelectedRowCountProps & {
    sx?: SxProps<Theme> | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export { GridSelectedRowCount };
