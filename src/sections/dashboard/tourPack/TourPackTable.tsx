import CustomTable from "@/components/customTable/customTable";
import { Stack, Typography } from "@mui/material";
import { useClearSearchParams } from "@/hooks/useClearSearchParams";
import { useEffect, useState } from "react";
import { ITourPack, TMethods, TStatus } from "@/interfaces";
import { useMutation } from "react-query";
import { deleteTourPack } from "./tourPack.api";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import CustomButton from "@/components/customButton";

interface IProps {
    setPage: (value: number) => void;
    isLoading: boolean;
    data: ITourPack[];
    error: any;
    count: number;
    rowClick: (data: ITourPack) => void;
    setEditItemValue: (value: ITourPack | null) => void;
    editItemValue: ITourPack | null;
    finallyRequest?: (method: TMethods, value: TStatus) => void;
}

const TourPackTable = ({
    setPage,
    data,
    isLoading,
    error,
    count,
    rowClick,
    setEditItemValue,
    editItemValue,
    finallyRequest = () => { },
}: IProps) => {
    const columns = {
        name: {
            path: "name",
            name: "Tur paket nomi",
            component: (rowData: ITourPack) => (
                <Typography
                    variant="body2"
                    fontSize={16}
                >
                    {rowData?.title?.uz ?? ''}
                </Typography>
            ),
        },
        description: {
            path: "description",
            name: "Tur paket haqida ma'lumot",
            component: (rowData: ITourPack) => (
                <Typography
                    variant="body2"
                    fontSize={16}
                    maxWidth={700}
                >
                    {rowData?.description?.uz?.slice(0, 200) + '...' ?? ''}
                </Typography>
            )
        },
        price: {
            path: "price",
            name: "Tur paket narxi($)",
        },
        edit: {
            path: "edit",
            name: "O'zgartirish",
            component: (rowData: ITourPack) => (
                <CustomButton onClick={() => rowClick(rowData)} width="30px" variant="outlined">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </CustomButton>
            ),
            width: '30px'
        },
        delete: {
            path: "delete",
            name: "O'chirish",
            component: (rowData: ITourPack) => (
                <CustomButton onClick={() => {
                    setEditItemValue(rowData)
                    deleteConfirmModalOpen(false)
                }
                } width="30px" variant="danger">
                    <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </CustomButton>
            ),
            width: '30px'
        }
    };

    const handleClose = () => {
        setEditItemValue(null);
    };

    const onPageChange = (page: number) => {
        setPage(page);
    };

    const clearParams = useClearSearchParams();

    useEffect(() => {
        clearParams();

        // eslint-disable-next-line
    }, []);

    const { mutateAsync, isLoading: deleteIsLoading } = useMutation(deleteTourPack);

    // delete confirm modal start
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [confirmType, setConfirmType] = useState<boolean>(false);

    const deleteConfirmModalOpen = (selecteds = false) => {
        setConfirmType(selecteds);
        setConfirmOpen(true);
    }

    const deleteConfirm = () => {
        deleteHandler();
    }
    // delete confirm modal end


    const deleteHandler = async () => {
        let status: TStatus = "SUCCESS";

        try {
            if (editItemValue?.id) {
                await mutateAsync(editItemValue?.id);
            }
        } catch (error) {
            status = "ERROR";
        } finally {
            finallyRequest("DELETE", status);
            setConfirmOpen(false);
            handleClose();
        }
    };

    return (
        <Stack px='20px' position="relative" minHeight="calc(100vh - 243px)">
            <CustomTable
                count={count}
                error={!!error}
                isLoading={isLoading}
                columns={columns}
                data={data || []}
                onPageChange={onPageChange}
                hideCheckbox={true}
            />

            <ConfirmModal
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={deleteConfirm}
                isLoading={deleteIsLoading}
                bodyHiddenDisabled={!confirmType}
            />
        </Stack>
    );
};

export default TourPackTable;
