import React, { useEffect, useState } from "react";
import { Stack, TableCell, TablePagination, TableRow, styled } from "@mui/material";
import { useSearchParams } from "react-router-dom";

interface Props {
    count: number;
    onPageChange?: (page: number) => void;
    setNewPage?: number;
    emptyRowColSpan: number;
    setSelectedItemsId: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}

function CustomTablePagination({ count = 0, onPageChange, setNewPage = 0, emptyRowColSpan, setSelectedItemsId }: React.PropsWithChildren<Props>) {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = Number(searchParams.get('page')) !== 0 ? Number(searchParams.get('page')) - 1 : 0;

    const [page, setPage] = useState<number>(initialPage);

    useEffect(() => { setPage(Number(setNewPage)) }, [setNewPage]);

    const onPageHanlder = (p: number) => {
        setPage(p);
        searchParams.set('page', String(p + 1));
        onPageChange && onPageChange(Number(searchParams.get('page')));
        setSearchParams(searchParams.toString());
        setSelectedItemsId([]);
    }

    return (
        <tfoot>
            <TableRow>
                <TableCell colSpan={emptyRowColSpan}>
                    <Stack height={53} position='absolute' bottom={6} left={0} right={0}>
                        <DisabledRowsPerPagePagination
                            rowsPerPageOptions={[16, 32, 48]}
                            count={count}
                            component="div"
                            rowsPerPage={16}
                            page={!count || count <= 0 ? 0 : page}
                            onPageChange={(_: any, p: number) => { onPageHanlder(p) }}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
        </tfoot>
    )
}

export default CustomTablePagination;

export const DisabledRowsPerPagePagination = styled<
    React.PropsWithChildren<any>
>(TablePagination)`
  & .MuiTablePagination-selectLabel,
  & .MuiInputBase-root {
    display: none;
  }
`;