import { Suspense, lazy, useState } from "react";
import { Stack, Table, TableContainer } from "@mui/material";
import { IColumns } from "./tyeps";
const CustomTableHead = lazy(() => import("./customTableHead"));
const CustomTableBody = lazy(() => import("./customTableBody"));
const CustomTablePagination = lazy(() => import("./customTablePagination"));

interface IProps {
    columns?: IColumns;
    data?: any[];
    hidePagination?: boolean;
    count?: number;
    onPageChange?: (page: number) => void;
    error?: boolean;
    isLoading?: boolean;
    rowClick?: (rowData: any) => void;
    setSelectedItems?: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    selectedItems?: (string | number)[];
    hideCheckbox?: boolean;
}

const CustomTable = ({
    columns,
    data,
    hidePagination = true,
    count = 0,
    onPageChange,
    error = false,
    isLoading = false,
    rowClick,
    setSelectedItems,
    selectedItems,
    hideCheckbox = false
}: IProps) => {
    const [selectedItemsId, setSelectedItemsId] = useState<(number | string)[]>(
        []
    );
    const emptyRowColSpan = Object.keys(columns || {}).length + 1;

    return (
        <Stack
            sx={{
                "& .simplebar-content-wrapper": {
                    outline: "none",
                },
                position: 'relative'
            }}
        >
            <Suspense fallback="">
                <TableContainer
                    sx={{
                        maxWidth: "100%",
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                    }}
                >
                    <Table size="small">
                        <CustomTableHead
                            tableBody={data ?? []}
                            columns={columns || {}}
                            selectedItemsId={selectedItems || selectedItemsId}
                            setSelectedItemsId={setSelectedItems || setSelectedItemsId}
                            hideCheckbox={hideCheckbox}
                        />

                        <CustomTableBody
                            loading={isLoading}
                            error={error}
                            data={data || []}
                            columns={columns || {}}
                            emptyRowColSpan={emptyRowColSpan}
                            rowClick={rowClick}
                            selectedItemsId={selectedItems || selectedItemsId}
                            setSelectedItemsId={setSelectedItems || setSelectedItemsId}
                            hideCheckbox={hideCheckbox}
                        />

                        {hidePagination && (
                            <CustomTablePagination
                                count={count}
                                onPageChange={onPageChange}
                                emptyRowColSpan={emptyRowColSpan}
                                setSelectedItemsId={setSelectedItems || setSelectedItemsId}
                            />
                        )}
                    </Table>
                </TableContainer>
            </Suspense>
        </Stack>
    );
};

export default CustomTable;
