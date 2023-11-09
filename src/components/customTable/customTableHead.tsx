import { Stack, TableCell, TableHead, TableRow } from "@mui/material";
import { IColumn, IColumns } from "./tyeps";
import CheckboxField from "../fields/CheckboxField";

interface IProps {
    columns: IColumns;
    selectedItemsId: (string | number)[];
    setSelectedItemsId: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    tableBody: any[];
    hideCheckbox: boolean;
}

const CustomTableHead = ({
    columns,
    selectedItemsId,
    tableBody,
    setSelectedItemsId,
    hideCheckbox,
}: IProps) => {
    const tableBodyLength = tableBody.length;
    const theads = Object.keys(columns);
    const chekcedController =
        tableBodyLength > 0 && tableBodyLength === selectedItemsId?.length;

    const selectAll = () => {
        if (tableBodyLength > selectedItemsId.length) {
            const allItemIdes = tableBody.map((item: any) => item.id);
            setSelectedItemsId(allItemIdes);
        } else {
            setSelectedItemsId([]);
        }
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    sx={{
                        bgcolor: "#F8FAFC",
                        p: "0 !important",
                    }}
                    padding="checkbox"
                >
                    <Stack
                        height={50}
                        justifyContent="center"
                        alignItems="center"
                        width={64}
                        sx={{
                            padding: "17px 11px !important",
                        }}
                    >
                        {hideCheckbox ? '№' : (
                            <CheckboxField
                                checked={chekcedController}
                                onChange={() => selectAll()}
                            />
                        )}
                    </Stack>
                </TableCell>
                {theads.map((key, index: number) => {
                    const { name }: IColumn = columns[key];

                    return (
                        <TableCell
                            key={index}
                            sx={{
                                bgcolor: "#F8FAFC",
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#1E293B",
                            }}
                            align="left"
                            padding="none"
                        >
                            <Stack py="8px" px="16px">
                                {name}
                            </Stack>
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
};

export default CustomTableHead;
