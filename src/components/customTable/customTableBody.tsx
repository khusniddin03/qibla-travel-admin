import { Stack, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { IColumns } from "./tyeps";
import { lazy } from "react";
import CheckboxField from "../fields/CheckboxField";
const CustomTableLoader = lazy(() => import("./customTableLoader"));
const CustomTableEpmtyRow = lazy(() => import("./customTableEmptyRow"));

interface IProps {
    data: any[];
    columns: IColumns;
    error: boolean;
    loading: boolean;
    emptyRowColSpan: number;
    rowClick?: (rowData: any) => void;
    selectedItemsId: (string | number)[];
    setSelectedItemsId: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    hideCheckbox: boolean;
}

const CustomTableBody = ({
    data = [],
    columns = {},
    error,
    loading,
    emptyRowColSpan,
    rowClick = () => { },
    setSelectedItemsId,
    selectedItemsId,
    hideCheckbox
}: IProps) => {
    const renderColumn = (item: any, column: string) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }

            return component;
        }

        return item[columns[column].path ?? ""];
    };

    const onSelectHandler = (
        itemId: number | string
    ) => {
        if (!selectedItemsId.includes(itemId)) {
            setSelectedItemsId((prevent: (number | string)[]) => [...prevent, itemId]);
        } else {
            const newSelectedItemdId = selectedItemsId.filter(
                (id: string | number) => id !== itemId
            );
            setSelectedItemsId(newSelectedItemdId);
        }
    };

    return (
        <TableBody>
            {error && (
                <CustomTableEpmtyRow emptyRowColSpan={emptyRowColSpan}>
                    <Typography
                        variant="body2"
                        sx={{ color: "#FF4842", fontWeight: "400", fontSize: 16 }}
                    >
                        Oбновить страницу или попробуйте позже
                    </Typography>
                </CustomTableEpmtyRow>
            )}

            {(loading && !error) && (
                <CustomTableEpmtyRow emptyRowColSpan={emptyRowColSpan}>
                    <CustomTableLoader />
                </CustomTableEpmtyRow>
            )}

            {(!loading && !data.length && !error) && (
                <CustomTableEpmtyRow emptyRowColSpan={emptyRowColSpan}>
                    <Typography
                        variant="body2"
                        sx={{ color: "#475569", fontWeight: "400", fontSize: 16 }}
                    >
                        Пока нет данных
                    </Typography>
                </CustomTableEpmtyRow>
            )}


            {(!loading && !error) &&
                data.map((item, index: number) => {
                    return (
                        <TableRow
                            key={index}
                            hover
                            style={{
                                height: "10px",
                            }}
                            onClick={() => rowClick(item)}
                        >
                            <TableCell
                                sx={{
                                    bgcolor: "#fff",
                                }}
                                padding="none"
                            >
                                <Stack
                                    height={63}
                                    justifyContent="center"
                                    alignItems="center"
                                    width={64}
                                    sx={{
                                        padding: "17px 11px !important",
                                    }}
                                >
                                    {hideCheckbox ? index + 1 : <CheckboxField
                                        stopPropagation
                                        checked={selectedItemsId.includes(item?.id)}
                                        onChange={() => onSelectHandler(item?.id)}
                                    />
                                    }
                                </Stack>
                            </TableCell>
                            {Object.keys(columns).map((column) => {
                                const style = {
                                    width: columns?.[column]?.width,
                                    bgcolor: "#fff",
                                }

                                if (!columns?.[column]?.width) {
                                    delete style.width;
                                }

                                return (
                                    <TableCell
                                        sx={style}
                                        align="left"
                                        padding="none"
                                        key={column}
                                    >
                                        <Stack py='8px' px='16px' fontSize={16} fontWeight={400}>
                                            {renderColumn(item, column)}
                                        </Stack>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}

            <TableRow
                sx={{
                    bgcolor: "#fff",
                }}
                style={{ height: 53 }}
            >
                <TableCell sx={{ border: 0 }} colSpan={emptyRowColSpan} />
            </TableRow>
        </TableBody>
    );
};

export default CustomTableBody;
