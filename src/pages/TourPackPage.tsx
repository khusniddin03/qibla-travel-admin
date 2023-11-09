import { useState, lazy, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Stack } from "@mui/material";
import TourPackTable from "@/sections/dashboard/tourPack/TourPackTable";
import TourPackFormModal from "@/sections/dashboard/tourPack/TourPackFormModal";
import StatusBar from "@/components/statusBar/StatusBar";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ITourPack, ITourPacksData, IStatusTexts, TMethods, TStatus } from "@/interfaces";
import { getTourPacks } from "@/sections/dashboard/tourPack/tourPack.api";
import { useQuery } from "react-query";
import { bodyHiddenHandler } from "@/utils/bodyHidden";
import { tourPackDecode } from "@/utils/tourPackDecode";

const PageHeader = lazy(() => import("@/components/pageHeader/PageHeader"));
const CustomButton = lazy(() => import("@/components/customButton"));

const ERROR_TEXT = "Nimadir noto'g'ri bajarildi";

const STATUS_TEXTS: IStatusTexts = {
    CREATE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Tur paket muvaffaqiyatli qo'shildi",
    },
    DELETE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Tur paket muvaffaqiyatli o'chirildi",
    },
    UPDATE: {
        ERROR: ERROR_TEXT,
        SUCCESS: "Tur paket muvaffaqiyatli yangilandi",
    },
};

const TourPackPage = () => {
    const [page, setPage] = useState<number>(1);

    const { isFetching, error, data, refetch } = useQuery<ITourPacksData>({
        queryKey: ["tour-packs", page],
        queryFn: getTourPacks(page),
    });

    const [formModalOpen, setFormModalOpen] =
        useState<boolean>(false);

    const [editItemValue, setEditItemValue] = useState<ITourPack | null>(null);

    // status bar states start
    const [statusBarOpen, setStatusBarOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<TStatus>("SUCCESS");
    const [statusText, setStatusText] = useState<string>('');
    // status bar states end
    const datesItemSchema = Yup.object().shape({
        date: Yup.string().required('Sana kiritish shart!'),
        people_count: Yup.number().required('Joylar sonini kiritish shart!').typeError('Faqat raqam bolishi kerak!'),
        duration: Yup.number().required('Davomiyligini kiritish shart!').typeError('Faqat raqam bolishi kerak!')
    });

    const schema = useMemo(() => (
        Yup.object().shape({
            id: Yup.number(),
            uz: Yup.string().required("Tur paket nomini kiritish shart!"),
            ru: Yup.string().required("Tur paket nomini kiritish shart!"),
            en: Yup.string().required("Tur paket nomini kiritish shart!"),
            description_uz: Yup.string().required("Tur paket haqida ma'lumot kiritish shart!"),
            description_ru: Yup.string().required("Tur paket haqida ma'lumot kiritish shart!"),
            description_en: Yup.string().required("Tur paket haqida ma'lumot kiritish shart!"),
            price: Yup.number().required("Tur paket narxini kiritish shart (usd)!").typeError('Faqat raqam bolishi kerak!'),
            price_uzs: Yup.number().required("Tur paket narxini kiritish shart (uzs)!").typeError('Faqat raqam bolishi kerak!'),
            city_id: Yup.string().required("Shaharlar tanlash shart!"),
            count: Yup.number().nullable().typeError('Faqat raqam bolishi kerak!'),
            logo: Yup.string().required("Rasm yuklash shart!"),
            additional: Yup.object().shape({
                uz: Yup.string().required("Qo'shimcha ma'lumotlar qo'shish shart!"),
                ru: Yup.string().required("Qo'shimcha ma'lumotlar qo'shish shart!"),
                en: Yup.string().required("Qo'shimcha ma'lumotlar qo'shish shart!"),
            }),
            dates: Yup.array().of(datesItemSchema)
        })
    ), [datesItemSchema]);

    const useFormData = useForm({
        resolver: yupResolver(schema)
    });

    const rowClick = (rowData: ITourPack) => {
        const logo = rowData?.logo === 'none' ? '' : rowData?.logo;
        const oldData = {
            ...rowData,
            ...rowData?.title,
            description_uz: rowData?.description?.uz,
            description_ru: rowData?.description?.ru,
            description_en: rowData?.description?.en,
            city_id: String(rowData?.city_id),
            count: rowData?.data?.count,
            logo: logo,
            dates: tourPackDecode(rowData?.data?.dates ?? {}),
            additional: rowData?.data?.additional,
            price_uzs: rowData?.data?.price_uzs
        }

        setEditItemValue({ ...oldData, ...rowData });
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
                <title> Tur paketlar </title>
            </Helmet>

            <PageHeader title="Tur paketlar">
                <Stack direction="row" gap={2.5}>
                    <CustomButton onClick={addBtnClickHandler} variant="contained">Tur paket qo'shish</CustomButton>
                </Stack>
            </PageHeader>

            <TourPackTable
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

            <TourPackFormModal
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

export default TourPackPage;
