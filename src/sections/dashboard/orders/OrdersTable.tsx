import CustomTable from "@/components/customTable/customTable";
import { Stack, Typography } from "@mui/material";
import { useClearSearchParams } from "@/hooks/useClearSearchParams";
import { useEffect, useState } from "react";
import { IOrder, TMethods, TStatus } from "@/interfaces";
import { useMutation } from "react-query";
import { deleteOrder, updateOrder } from "./orders.api";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import CustomButton from "@/components/customButton";
import OrderPreview from "./OrderPreview";

interface IProps {
    setPage: (value: number) => void;
    isLoading: boolean;
    data: IOrder[];
    error: any;
    count: number;
    finallyRequest?: (method: TMethods, value: TStatus) => void;
}

const OrdersTable = ({
    setPage,
    data,
    isLoading,
    error,
    count,
    finallyRequest = () => { },
}: IProps) => {
    const { isLoading: updateIsLoading, mutateAsync: updateMutateAsync } =
        useMutation(({ id, data }: { id: number; data: any }) =>
            updateOrder(id, data)
        );

    const { isLoading: deleteLoading, mutateAsync: deleteMutateAsync } = useMutation(deleteOrder);

    const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
    const [deleteOrderData, setDeleteOrderData] = useState<IOrder | null>(null);

    const columns = {
        name: {
            path: "name",
            name: "Ism",
            component: (rowData: IOrder) => (
                <Typography variant="body2" fontSize={16}>
                    {rowData?.data?.name ?? ""}
                </Typography>
            ),
        },
        email: {
            path: "email",
            name: "Email",
            component: (rowData: IOrder) => (
                <Typography variant="body2" fontSize={16}>
                    {rowData?.data?.email ?? ""}
                </Typography>
            ),
        },
        phone: {
            path: "phone",
            name: "Phone",
            component: (rowData: IOrder) => (
                <Typography variant="body2" fontSize={16}>
                    {rowData?.data?.phone_number ?? ""}
                </Typography>
            ),
        },
        people_count: {
            path: "people_count",
            name: "Yo'lovchilar soni",
        },
        preview: {
            path: "preview",
            name: "Ko'rish",
            component: (rowData: IOrder) => (
                <CustomButton
                    onClick={() => setCurrentOrder(rowData)}
                    variant="outlined"
                >
                    <svg
                        width={24}
                        height={24}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </CustomButton>
            ),
            width: "30px",
        },
        confirmation: {
            path: "confirmation",
            name: "Tasdiqlash",
            component: (rowData: IOrder) => (
                <CustomButton
                    onClick={() => confirmOrder(rowData)}
                    variant="primary"
                    disabled={rowData?.status === "1"}
                    isLoading={updateIsLoading}
                >
                    {rowData?.status === "1" ? "Tasdiqlangan" : "Tasdiqlash"}
                </CustomButton>
            ),
            width: "30px",
        },
        delete: {
            path: "delete",
            name: "O'chirish",
            component: (rowData: IOrder) => (
                <CustomButton onClick={() => {
                    setDeleteOrderData(rowData);
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

    const onPageChange = (page: number) => {
        setPage(page);
    };

    const clearParams = useClearSearchParams();

    useEffect(() => {
        clearParams();

        // eslint-disable-next-line
    }, []);

    const confirmOrder = async (rowData: IOrder) => {
        let status: TStatus = "SUCCESS";

        try {
            if (rowData?.id) {
                await updateMutateAsync({
                    id: rowData?.id,
                    data: { ...rowData, status: 1 },
                });
            }
        } catch (error) {
            status = "ERROR";
        } finally {
            finallyRequest("DELETE", status);
            setConfirmOpen(false);
        }
    };
    // delete confirm modal start
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [confirmType, setConfirmType] = useState<boolean>(false);

    const deleteConfirmModalOpen = (selecteds = false) => {
        setConfirmType(selecteds);
        setConfirmOpen(true);
    }

    const deleteConfirm = () => {
        deleteHandler();
    };
    // delete confirm modal end

    const deleteHandler = async () => {
        let status: TStatus = "SUCCESS";

        try {
            if (deleteOrderData?.id) {
                await deleteMutateAsync(deleteOrderData?.id);
            }
        } catch (error) {
            status = "ERROR";
        } finally {
            finallyRequest("DELETE", status);
            setConfirmOpen(false);
        }
    };

    return (
        <Stack px="20px" position="relative" minHeight="calc(100vh - 243px)">
            {currentOrder ? (
                <OrderPreview
                    order={currentOrder}
                    setOrder={setCurrentOrder}
                />
            ) : (
                <>
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
                        isLoading={deleteLoading}
                        bodyHiddenDisabled={!confirmType}
                    />
                </>
            )}
        </Stack>
    );
};

export default OrdersTable;
