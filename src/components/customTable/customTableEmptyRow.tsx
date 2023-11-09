import React from "react";
import { Stack, TableCell, TableRow } from "@mui/material";

interface IProps {
    emptyRowColSpan: number;
}

const CustomTableEpmtyRow = ({ children, emptyRowColSpan }: React.PropsWithChildren<IProps>) => {
    return (
        <TableRow
            sx={{
                bgcolor: "#fff",
            }}
            style={{ height: "400px" }}
        >
            <TableCell colSpan={emptyRowColSpan}>
                <Stack alignItems="center" justifyContent="center">
                    {children}
                </Stack>
            </TableCell>
        </TableRow>
    );
}

export default CustomTableEpmtyRow;