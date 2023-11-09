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
} from "react-hook-form";
import { createHotel, updateHotel } from "./hotels.api";
import { IHotel, TMethods, TStatus } from "@/interfaces";
import CreateHotelForm from "./CreateHotelForm";

export const HOTEL_IMG_OPTIONAL_VALUE = '--none--';

interface IUseForm {
    id?: number;
    uz: string;
    ru: string;
    en: string;
    description_uz?: string;
    description_ru?: string;
    description_en?: string;
    logo?: string;
}

export interface IFormProps {
    control: Control<IUseForm, any>;
    register: UseFormRegister<IUseForm>;
    getValues: UseFormGetValues<IUseForm>;
    formState: FormState<IUseForm>;
    handleSubmit: UseFormHandleSubmit<IUseForm, undefined>;
    reset: UseFormReset<IUseForm>;
    setValue: UseFormSetValue<IUseForm>;
}

interface IProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    useFormData: IFormProps;
    finallyRequest?: (method: TMethods, value: TStatus) => void;
}

const HotelsFormModal = ({
    open,
    setOpen,
    useFormData,
    finallyRequest = () => { },
}: IProps) => {
    const { getValues, reset } = useFormData;

    const { isLoading, mutateAsync } = useMutation(createHotel);

    const createHandler = async () => {
        const {
            description_en: uz = "",
            description_ru: ru = "",
            description_uz: en = "",
            logo,
            ...other
        } = getValues();
        const data = {
            description: { uz, ru, en },
            title: other,
            logo: logo ? logo : HOTEL_IMG_OPTIONAL_VALUE,
            data: {},
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
        useMutation(({ id, data }: { id: number; data: IHotel }) =>
            updateHotel(id, data)
        );

    const updateHandler = async () => {
        const {
            description_en: uz = "",
            description_ru: ru = "",
            description_uz: en = "",
            logo,
            ...other
        } = getValues();
        delete other.id;
        const data = {
            description: { uz, ru, en },
            title: other,
            logo: logo ? logo : HOTEL_IMG_OPTIONAL_VALUE,
            data: {},
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

    return (
        <CreateHotelForm
            createHandler={isUpdate ? updateHandler : createHandler}
            isLoading={isUpdate ? updateIsLoading : isLoading}
            open={open}
            setOpen={setOpen}
            {...useFormData}
            title={
                isUpdate ? "Mehmonxona nomini o'zgartirish" : "Mehmonxona qo'shish"
            }
        />
    );
};

export default HotelsFormModal;
