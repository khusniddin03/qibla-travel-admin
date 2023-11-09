import { useState, lazy, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Stack } from "@mui/material";
import CitiesTable from "@/sections/dashboard/cities/CitiesTable";
import CitiesFormModal from "@/sections/dashboard/cities/CitiesFormModal";
import StatusBar from "@/components/statusBar/StatusBar";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICitiesData, ICity, IStatusTexts, TMethods, TStatus } from "@/interfaces";
import { getCities } from "@/sections/dashboard/cities/cities.api";
import { useQuery } from "react-query";
import { bodyHiddenHandler } from "@/utils/bodyHidden";

const PageHeader = lazy(() => import("@/components/pageHeader/PageHeader"));
const CustomButton = lazy(() => import("@/components/customButton"));

const ERROR_TEXT = "Nimadir noto'g'ri bajarildi";

const STATUS_TEXTS: IStatusTexts = {
    CREATE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Shahar muvaffaqiyatli qo'shildi",
    },
    DELETE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Shahar muvaffaqiyatli o'chirildi",
    },
    UPDATE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Shahar muvaffaqiyatli yangilandi",
    },
};

const CitiesPage = () => {
    const [page, setPage] = useState<number>(1);

    const { isFetching, error, data, refetch } = useQuery<ICitiesData>({
        queryKey: ["cities", page],
        queryFn: getCities(page),
    });

    const [formModalOpen, setFormModalOpen] =
        useState<boolean>(false);

    const [editItemValue, setEditItemValue] = useState<ICity | null>(null);

    // status bar states start
    const [statusBarOpen, setStatusBarOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<TStatus>("SUCCESS");
    const [statusText, setStatusText] = useState<string>('');
    // status bar states end

    const schema = useMemo(() => (
        Yup.object().shape({
            id: Yup.number(),
            uz: Yup.string().required("Shahar nomini kiritish shart!"),
            ru: Yup.string().required("Shahar nomini kiritish shart!"),
            en: Yup.string().required("Shahar nomini kiritish shart!"),
        })
    ), []);

    const useFormData = useForm({
        resolver: yupResolver(schema),
    });

    const rowClick = (rowData: ICity) => {
        const oldData = {
            ...rowData,
            ...rowData?.title
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
                <title> Shaharlar </title>
            </Helmet>

            <PageHeader title="Shaharlar">
                <Stack direction="row" gap={2.5}>
                    <CustomButton onClick={addBtnClickHandler} variant="contained">Shahar qo'shish</CustomButton>
                </Stack>
            </PageHeader>

            <CitiesTable
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

            <CitiesFormModal
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

export default CitiesPage;
