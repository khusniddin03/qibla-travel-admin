import CreateFormButtons from "@/components/createFormButtons/CreateFormButtons";
import CustomModal from "@/components/customModal/CustomModal";
import CustomTextField from "@/components/fields/CustomTextField";
import ModalHeader from "@/components/modalHeader/ModalHeader";
import CustomTextareaField from "@/components/fields/CustomTextareaField";
import useResponsive from "@/hooks/useResponsive";
import UploadImg from "@/components/upload-img/uploadImg";
import { IFormProps } from "./HotelsFormModal";
import { Stack } from "@mui/material";
import { useState, useEffect } from 'react';

interface IProps extends IFormProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    createHandler: () => void;
    isLoading: boolean;
    title?: string;
}

const CreateHotelForm = ({
    open,
    setOpen,
    handleSubmit,
    createHandler,
    register,
    formState,
    setValue,
    getValues,
    reset,
    isLoading,
    title = "Mehmonxona qo'shish",
}: IProps) => {
    const isLg = useResponsive('up', 'xl');
    const isMd = useResponsive('up', 'md');
    const { errors } = formState;
    const [responseUrl, setRespnonseUrl] = useState<string | null>(null);
    const [staticImgUrl, setStaticImgUrl] = useState<string | null>('');
    const [imageError, setImageError] = useState<boolean>(false);

    useEffect(() => {
        if (responseUrl) {
            setValue('logo', responseUrl);
        } else {
            setValue('logo', '');
        }
    }, [responseUrl, setValue]);

    useEffect(() => {
        setStaticImgUrl(getValues()?.logo ?? null);

        //eslint-disable-next-line
    }, [getValues().logo]);

    useEffect(() => {
        if (!open) {
            setStaticImgUrl(null);
            setImageError(false);
            reset();
            setValue('logo', '');
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
                            label="Mehmonxona nomi"
                            name="uz"
                            disabled={isLoading}
                        />
                        <CustomTextField
                            register={register}
                            errors={errors}
                            label="Название отеля"
                            name="ru"
                            disabled={isLoading}
                        />
                        <CustomTextField
                            register={register}
                            errors={errors}
                            label="Hotel name"
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
                            label="Mehmonxona haqida ma'lumot"
                            name="description_uz"
                            disabled={isLoading}
                        />
                        <CustomTextareaField
                            register={register}
                            errors={errors}
                            label="Информация об отеле"
                            name="description_ru"
                            disabled={isLoading}
                        />
                        <CustomTextareaField
                            register={register}
                            errors={errors}
                            label="Information about the hotel"
                            name="description_en"
                            disabled={isLoading}
                        />
                    </Stack>
                    <UploadImg
                        error={imageError}
                        staticImgUrl={staticImgUrl}
                        setRespnonseUrl={setRespnonseUrl}
                        title="Rasm yuklash"
                    />
                </Stack>
                <CreateFormButtons isLoading={isLoading} setOpen={setOpen} />
            </form>
        </CustomModal>
    );
};

export default CreateHotelForm;
