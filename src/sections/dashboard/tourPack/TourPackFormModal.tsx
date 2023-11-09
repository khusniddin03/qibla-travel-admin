import { useEffect } from "react";
import { useMutation } from "react-query";
import {
    Control,
    FormState,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormReset,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import { createTourPack, updateTourPack } from "./tourPack.api";
import { ITourPack, TMethods, TStatus } from "@/interfaces";
import CreateTourPackForm from "./CreateTourPackForm";
import { tourPackEncode } from "@/utils/tourPackEncode";

export interface IUseForm {
    id?: number;
    uz: string;
    ru: string;
    en: string;
    description_uz: string;
    description_ru: string;
    description_en: string;
    price: number;
    price_uzs: number;
    city_id: string;
    count?: number | null;
    logo: string;
    additional: {
        uz: string;
        ru: string;
        en: string;
    };
    dates?: {
        date: string;
        people_count: number;
        duration: number;
    }[];
}

export interface IFormProps {
    control: Control<IUseForm, any>;
    register: UseFormRegister<IUseForm>;
    getValues: UseFormGetValues<IUseForm>;
    formState: FormState<IUseForm>;
    handleSubmit: UseFormHandleSubmit<IUseForm, undefined>;
    reset: UseFormReset<IUseForm>;
    setValue: UseFormSetValue<IUseForm>;
    watch: UseFormWatch<IUseForm>;
}

interface IProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    useFormData: IFormProps;
    finallyRequest?: (method: TMethods, value: TStatus) => void;
}

const TourPackFormModal = ({
    open,
    setOpen,
    useFormData,
    finallyRequest = () => { },
}: IProps) => {
    const { getValues, reset } = useFormData;

    const { isLoading, mutateAsync } = useMutation(createTourPack);

    const createHandler = async () => {
        const {
            description_en: uz,
            description_ru: ru,
            description_uz: en,
            price,
            city_id,
            count,
            additional,
            price_uzs,
            logo,
            dates,
            ...other
        } = getValues();
        delete other.id;
        const data = {
            description: { uz, ru, en },
            title: other,
            city_id: +city_id,
            price,
            logo,
            data: {
                count,
                additional,
                price_uzs,
                dates: tourPackEncode(dates ?? [])
            },
        };

        let status: TStatus = "SUCCESS";

        try {
            await mutateAsync(data);
        } catch (error) {
            status = "ERROR";
        } finally {
            finallyRequest("CREATE", status);
            reset();
            setOpen(false);
        }
    };

    const { isLoading: updateIsLoading, mutateAsync: updateMutateAsync } =
        useMutation(({ id, data }: { id: number; data: ITourPack }) =>
            updateTourPack(id, data)
        );

    const updateHandler = async () => {
        const {
            description_en: d_uz,
            description_ru: d_ru,
            description_uz: d_en,
            additional,
            dates,
            price,
            price_uzs,
            city_id,
            count,
            logo,
            en,
            uz,
            ru,
            ...other
        } = getValues();
        delete other.id;
        const data = {
            description: { uz: d_uz, ru: d_ru, en: d_en },
            title: { uz, ru, en },
            city_id: +city_id,
            price,
            logo,
            data: {
                count,
                additional,
                price_uzs,
                dates: tourPackEncode(dates ?? [])
            },
        };

        let status: TStatus = "SUCCESS";

        try {
            const { id } = getValues();
            if (id) {
                await updateMutateAsync({ id, data });
            }
        } catch (_) {
            status = "ERROR";
        } finally {
            finallyRequest("UPDATE", status);
            reset();
            setOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
            reset();
        }
    }, [open, reset]);

    const isUpdate = !!getValues()?.id;
    const logo = isUpdate ? getValues()?.logo : undefined;

    return (
        <CreateTourPackForm
            createHandler={isUpdate ? updateHandler : createHandler}
            isLoading={isUpdate ? updateIsLoading : isLoading}
            open={open}
            setOpen={setOpen}
            {...useFormData}
            title={
                isUpdate ? "Ekskursiya nomini o'zgartirish" : "Ekskursiya qo'shish"
            }
            logo={logo}
        />
    );
};

export default TourPackFormModal;
