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
import { createCity, updateCity } from "./cities.api";
import { ICity, TMethods, TStatus } from "@/interfaces";
import CreateCitiesForm from "./CreateCitiesForm";

interface IUseForm {
    id?: number;
    uz: string;
    ru: string;
    en: string;
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

const CitiesFormModal = ({
    open,
    setOpen,
    useFormData,
    finallyRequest = () => { },
}: IProps) => {
    const { getValues, reset } = useFormData;

    const { isLoading, mutateAsync } = useMutation(createCity);

    const createHandler = async () => {
        const { uz, ru, en } = getValues();
        const data = { title: { uz, ru, en } };

        let status: TStatus = 'SUCCESS';

        try {
            await mutateAsync(data);
        } catch (error) {
            status = 'ERROR';
        } finally {
            finallyRequest('CREATE', status);
            reset();
            setOpen(false);
        }
    };

    const { isLoading: updateIsLoading, mutateAsync: updateMutateAsync } =
        useMutation(({ id, data }: { id: number; data: ICity }) => updateCity(id, data));

    const updateHandler = async () => {
        const { uz, ru, en } = getValues();
        const data = { title: { uz, ru, en } };

        let status: TStatus = 'SUCCESS';

        try {
            const { id } = getValues();
            if (id) {
                await updateMutateAsync({ id, data: data });
            }
        } catch (_) {
            status = 'ERROR';
        } finally {
            finallyRequest('UPDATE', status);
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
        <CreateCitiesForm
            createHandler={isUpdate ? updateHandler : createHandler}
            isLoading={isUpdate ? updateIsLoading : isLoading}
            open={open}
            setOpen={setOpen}
            {...useFormData}
            title={isUpdate ? "Shahar nomini o'zgartirish" : "Shahar qo'shish"}
        />
    );
};

export default CitiesFormModal;
