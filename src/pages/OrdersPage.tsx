import { useState, lazy } from "react";
import { Helmet } from "react-helmet-async";
import OrdersTable from "@/sections/dashboard/orders/OrdersTable";
import StatusBar from "@/components/statusBar/StatusBar";
import { IOrdersData, IStatusTexts, TMethods, TStatus } from "@/interfaces";
import { useQuery } from "react-query";
import { getOrders } from "@/sections/dashboard/orders/orders.api";

const PageHeader = lazy(() => import("@/components/pageHeader/PageHeader"));

const ERROR_TEXT = "Nimadir noto'g'ri bajarildi";

const STATUS_TEXTS: IStatusTexts = {
    CREATE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Buyurtma muvaffaqiyatli qo'shildi",
    },
    DELETE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Buyurtma muvaffaqiyatli o'chirildi",
    },
    UPDATE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Buyurtma muvaffaqiyatli tasdiqlandi",
    },
};

const OrdersPage = () => {
    const [page, setPage] = useState<number>(1);

    const { isFetching, error, data, refetch } = useQuery<IOrdersData>({
        queryKey: ["orders", page],
        queryFn: getOrders(page),
    });

    // status bar states start
    const [statusBarOpen, setStatusBarOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<TStatus>("SUCCESS");
    const [statusText, setStatusText] = useState<string>('');
    // status bar states end

    const finallyRequest = (method: TMethods, status: TStatus) => {
        // statusbar setStates start
        setStatus(status);
        setStatusText(STATUS_TEXTS?.[method]?.[status]);
        setStatusBarOpen(true);
        // statusbar setStates end

        if (status === "SUCCESS") {
            refetch();
        }
    };

    return (
        <>
            <Helmet>
                <title> Buyurtmalar </title>
            </Helmet>

            <PageHeader title="Buyurtmalar" />

            <OrdersTable
                setPage={setPage}
                isLoading={isFetching}
                data={data?.data?.data || []}
                count={data?.data?.total || 0}
                error={error}
                finallyRequest={finallyRequest}
            />
            <StatusBar
                status={status}
                open={statusBarOpen}
                setOpen={setStatusBarOpen}
                text={statusText}
            />
        </>
    );
};

export default OrdersPage;
