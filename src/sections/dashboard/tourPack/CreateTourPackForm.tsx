import CreateFormButtons from "@/components/createFormButtons/CreateFormButtons";
import CustomModal from "@/components/customModal/CustomModal";
import CustomTextField from "@/components/fields/CustomTextField";
import ModalHeader from "@/components/modalHeader/ModalHeader";
import CustomTextareaField from "@/components/fields/CustomTextareaField";
import CustomSelect from "@/components/customSelect/CustomSelect";
import useResponsive from "@/hooks/useResponsive";
import TourDateTable from "../../../components/TourDateTable/TourDateTable";
import UploadImg from "@/components/upload-img/uploadImg";
import { Controller } from "react-hook-form";
import { IFormProps, IUseForm } from "./TourPackFormModal";
import { Stack } from "@mui/material";
import { useQuery } from "react-query";
import { ICitiesData, ICity } from "@/interfaces";
import { getCitiesAll } from "../cities/cities.api";
import { useState, useEffect } from 'react';
import { UseFormWatch,UseFormSetValue } from "react-hook-form";

interface IProps extends IFormProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    createHandler: () => void;
    isLoading: boolean;
    title?: string;
    logo?: string | undefined | null;
    watch: UseFormWatch<IUseForm>;
    setValue: UseFormSetValue<IUseForm>;
}

const CreateTourPackForm = ({
    open,
    setOpen,
    handleSubmit,
    createHandler,
    register,
    getValues,
    control,
    formState,
    setValue,
    reset,
    isLoading,
    title = "Ekskursiya qo'shish",
    logo,
    watch
}: IProps) => {
    const isLg = useResponsive('up', 'xl');
    const isMd = useResponsive('up', 'md');
    const { errors } = formState;
    const { data: cities } = useQuery<ICitiesData>({
        queryKey: ["cities", open],
        queryFn: getCitiesAll(open),
    });

    const [responseUrl, setRespnonseUrl] = useState<string | null>(null);
    const [imageError, setImageError] = useState<boolean>(false);

    useEffect(() => {
        if (responseUrl) {
            setValue('logo', responseUrl);
        } else {
            setValue('logo', '');
        }
    }, [responseUrl, setValue]);

    useEffect(() => {
        if (!open) {
            setImageError(false);
            reset();
        }
    }, [open, setValue, reset]);

    useEffect(() => {
        if (errors?.logo) {
            setImageError(true);
        }
    }, [errors?.logo]);

    return (
        <CustomModal columns={isLg ? "70%" : '90%'} disabledClose={isLoading} open={open} setOpen={setOpen}>
            <ModalHeader title={title} onClose={() => setOpen(false)} disabled={isLoading} />

            <form onSubmit={handleSubmit(createHandler)}>
                <Stack gap="14px" mb="28px">
                    <Controller
                        control={control}
                        name="city_id"
                        render={({ field: { onChange, ref } }) => (
                            <CustomSelect
                                bodyHiddenDisabled={false}
                                name="city_id"
                                label="Shaharlar"
                                onChange={onChange}
                                ref={ref}
                                placeholderType={true}
                                disabled={isLoading}
                                value={String(getValues()?.city_id) ?? ''}
                                valueKey="id"
                                data={cities?.data?.data || []}
                                errors={errors}
                                type="number"
                                render={(city: ICity) => city?.title?.uz}
                            />
                        )}
                    />
                    <Stack
                        direction='row'
                        sx={{
                            flexWrap: isMd ? 'nowrap' : 'wrap',
                            gap: '10px'
                        }}
                    >
                        <CustomTextField
                            register={register}
                            errors={errors}
                            label="Tur paket nomi"
                            name="uz"
                            disabled={isLoading}
                        />
                        <CustomTextField
                            register={register}
                            errors={errors}
                            label="Названия тур пакета"
                            name="ru"
                            disabled={isLoading}
                        />
                        <CustomTextField
                            register={register}
                            errors={errors}
                            label="Type package name"
                            name="en"
                            disabled={isLoading}
                        />
                    </Stack>
                    <Stack
                        direction='row'
                        sx={{
                            flexWrap: isMd ? 'nowrap' : 'wrap',
                            gap: '10px'
                        }}
                    >
                        <CustomTextareaField
                            register={register}
                            errors={errors}
                            label="Tur paket haqida ma'lumot"
                            name="description_uz"
                            disabled={isLoading}
                            width="100%"
                        />
                        <CustomTextareaField
                            register={register}
                            errors={errors}
                            label="Информация о турпакете"
                            name="description_ru"
                            disabled={isLoading}
                        />
                        <CustomTextareaField
                            register={register}
                            errors={errors}
                            label="Information about the tour package"
                            name="description_en"
                            disabled={isLoading}
                        />
                    </Stack>
                    <Stack
                        direction='row'
                        sx={{
                            flexWrap: isMd ? 'nowrap' : 'wrap',
                            gap: '10px'
                        }}
                    >
                        <CustomTextareaField
                            register={register}
                            errors={errors}
                            label="Qo'shimcha qulayliklar"
                            name="additional.uz"
                            disabled={isLoading}
                            width="100%"
                        />
                        <CustomTextareaField
                            register={register}
                            errors={errors}
                            label="Дополнительные удобства"
                            name="additional.ru"
                            disabled={isLoading}
                        />
                        <CustomTextareaField
                            register={register}
                            errors={errors}
                            label="Дополнительные удобства"
                            name="additional.en"
                            disabled={isLoading}
                        />
                    </Stack>
                    <Stack
                        direction='row'
                        sx={{
                            flexWrap: isMd ? 'nowrap' : 'wrap',
                            gap: '10px'
                        }}
                    >
                        <CustomTextField
                            register={register}
                            errors={errors}
                            label="Tur paket narxi (usd)"
                            name="price"
                            disabled={isLoading}
                        />
                        <CustomTextField
                            register={register}
                            errors={errors}
                            label="Tur paket narxi (uzs)"
                            name="price_uzs"
                            disabled={isLoading}
                        />
                        <CustomTextField
                            register={register}
                            errors={errors}
                            label="Yashilga o'tish soni"
                            name="count"
                            disabled={isLoading}
                            defaultValue="0"
                        />
                    </Stack>
                    <TourDateTable
                        watch={watch}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        isLoading={isLoading}
                    />
                    <UploadImg
                        error={imageError}
                        staticImgUrl={logo ?? null}
                        setRespnonseUrl={setRespnonseUrl}
                        title="Rasm yuklash"
                    />
                </Stack>
                <CreateFormButtons isLoading={isLoading} setOpen={setOpen} />
            </form>
        </CustomModal>
    );
};

export default CreateTourPackForm;
