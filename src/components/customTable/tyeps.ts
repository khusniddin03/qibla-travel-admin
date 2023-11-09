import { ReactNode } from 'react';

export interface IColumn {
    path?: string;
    name?: string;
    component?: ReactNode | ((data: any) => ReactNode);
    width?: string;
}

export interface IColumns {
    [key: string]: IColumn;
}