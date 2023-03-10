import * as React from 'react';
import { GridRowId, GridRowIdGetter, GridRowModel, GridRowTreeConfig } from '../../../models';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridRowsInternalCache, GridRowsState } from './gridRowsState';
/**
 * A helper function to check if the id provided is valid.
 * @param {GridRowId} id Id as [[GridRowId]].
 * @param {GridRowModel | Partial<GridRowModel>} row Row as [[GridRowModel]].
 * @param {string} detailErrorMessage A custom error message to display for invalid IDs
 */
export declare function checkGridRowIdIsValid(id: GridRowId, row: GridRowModel | Partial<GridRowModel>, detailErrorMessage?: string): void;
export declare const getRowIdFromRowModel: (rowModel: GridRowModel, getRowId?: GridRowIdGetter, detailErrorMessage?: string) => GridRowId;
export declare const createRowsInternalCache: ({ rows, getRowId, loading, rowCount, }: Pick<DataGridProcessedProps, 'rows' | 'getRowId' | 'loading' | 'rowCount'>) => GridRowsInternalCache;
export declare const getRowsStateFromCache: ({ apiRef, previousTree, rowCountProp, loadingProp, }: {
    apiRef: React.MutableRefObject<GridApiCommunity>;
    previousTree: GridRowTreeConfig | null;
    rowCountProp: number | undefined;
    loadingProp: boolean | undefined;
}) => GridRowsState;
export declare const getTreeNodeDescendants: (tree: GridRowTreeConfig, parentId: GridRowId, skipAutoGeneratedRows: boolean) => GridRowId[];
export declare function calculatePinnedRowsHeight(apiRef: React.MutableRefObject<GridApiCommunity>): {
    top: number;
    bottom: number;
};
