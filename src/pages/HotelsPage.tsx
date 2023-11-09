import { useState, lazy, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Stack } from "@mui/material";
import HotelsTable from "@/sections/dashboard/hotels/HotelsTable";
import HotelsFormModal, { HOTEL_IMG_OPTIONAL_VALUE } from "@/sections/dashboard/hotels/HotelsFormModal";
import StatusBar from "@/components/statusBar/StatusBar";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IHotel, IHotelsData, IStatusTexts, TMethods, TStatus } from "@/interfaces";
import { getHotels } from "@/sections/dashboard/hotels/hotels.api";
import { useQuery } from "react-query";
import { bodyHiddenHandler } from "@/utils/bodyHidden";

const PageHeader = lazy(() => import("@/components/pageHeader/PageHeader"));
const CustomButton = lazy(() => import("@/components/customButton"));

const ERROR_TEXT = "Nimadir noto'g'ri bajarildi";

const STATUS_TEXTS: IStatusTexts = {
    CREATE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Mehmonxona muvaffaqiyatli qo'shildi",
    },
    DELETE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Mehmonxona muvaffaqiyatli o'chirildi",
    },
    UPDATE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Mehmonxona muvaffaqiyatli yangilandi",
    },
};

const HotelsPage = () => {
    const [page, setPage] = useState<number>(1);

    const { isFetching, error, data, refetch } = useQuery<IHotelsData>({
        queryKey: ["hotels", page],
        queryFn: getHotels(page),
    });

    const [formModalOpen, setFormModalOpen] =
        useState<boolean>(false);

    const [editItemValue, setEditItemValue] = useState<IHotel | null>(null);

    // status bar states start
    const [statusBarOpen, setStatusBarOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<TStatus>("SUCCESS");
    const [statusText, setStatusText] = useState<string>('');
    // status bar states end

    const schema = useMemo(() => (
        Yup.object().shape({
            id: Yup.number(),
            uz: Yup.string().required("Mehmonxona nomini kiritish shart!"),
            ru: Yup.string().required("Mehmonxona nomini kiritish shart!"),
            en: Yup.string().required("Mehmonxona nomini kiritish shart!"),
            description_uz: Yup.string(),
            description_ru: Yup.string(),
            description_en: Yup.string(),
            logo: Yup.string()
        })
    ), []);

    const useFormData = useForm({
        resolver: yupResolver(schema),
    });

    const rowClick = (rowData: IHotel) => {
        const oldData = {
            ...rowData,
            ...rowData?.title,
            description_uz: rowData?.description?.uz ?? '',
            description_ru: rowData?.description?.ru ?? '',
            description_en: rowData?.description?.en ?? '',
            logo: rowData?.logo === HOTEL_IMG_OPTIONAL_VALUE ? '' : rowData?.logo
        }
        setEditItemValue(oldData);
        useFormData.reset(oldData);
        setFormModalOpen(true);
        bodyHiddenHandler(true);
    };

    const addBtnClickHandler = () => {
        bodyHiddenHandler(true);
        useFormData.reset({});
        setFormModalOpen(true);
    };

    const finallyRequest = (method: TMethods, status: TStatus) => {
        // statusbar setStates start
        setStatus(status);
        setStatusText(STATUS_TEXTS?.[method]?.[status]);
        setStatusBarOpen(true);
        // statusbar setStates end

        setEditItemValue(null);

        if (status === "SUCCESS") {
            refetch();
        }
    };

    return (
        <>
            <Helmet>
                <title> Mehmonxonalar </title>
            </Helmet>

            <PageHeader title="Mehmonxonalar">
                <Stack direction="row" gap={2.5}>
                    <CustomButton onClick={addBtnClickHandler} variant="contained">Mehmonxona qo'shish</CustomButton>
                </Stack>
            </PageHeader>

            <HotelsTable
                setPage={setPage}
                isLoading={isFetching}
                data={data?.data?.data || []}
                count={data?.data?.total || 0}
                error={error}
                rowClick={rowClick}
                editItemValue={editItemValue}
                setEditItemValue={setEditItemValue}
                finallyRequest={finallyRequest}
            />

            <HotelsFormModal
                useFormData={useFormData}
                open={formModalOpen}
                setOpen={setFormModalOpen}
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

export default HotelsPage;
