import CreateFormButtons from "@/components/createFormButtons/CreateFormButtons";
import CustomModal from "@/components/customModal/CustomModal";
import CustomTextField from "@/components/fields/CustomTextField";
import ModalHeader from "@/components/modalHeader/ModalHeader";
import { IFormProps } from "./CitiesFormModal";
import { Stack } from "@mui/material";


interface IProps extends IFormProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    createHandler: () => void;
    isLoading: boolean;
    title?: string;
}

const CreateCitiesForm = ({
    open,
    setOpen,
    handleSubmit,
    createHandler,
    register,
    formState,
    isLoading,
    title = "Shahar qo'shish",
}: IProps) => {
    const { errors } = formState;

    return (
        <CustomModal disabledClose={isLoading} open={open} setOpen={setOpen}>
            <ModalHeader title={title} onClose={() => setOpen(false)} disabled={isLoading} />

            <form onSubmit={handleSubmit(createHandler)}>
                <Stack gap="14px" mb="28px">
                    <CustomTextField
                        register={register}
                        errors={errors}
                        label="Shahar nomi"
                        name="uz"
                        disabled={isLoading}
                    />
                     <CustomTextField
                        register={register}
                        errors={errors}
                        label="Название города"
                        name="ru"
                        disabled={isLoading}
                    />
                     <CustomTextField
                        register={register}
                        errors={errors}
                        label="City name"
                        name="en"
                        disabled={isLoading}
                    />
                </Stack>
                <CreateFormButtons isLoading={isLoading} setOpen={setOpen} />
            </form>
        </CustomModal>
    );
};

export default CreateCitiesForm;
