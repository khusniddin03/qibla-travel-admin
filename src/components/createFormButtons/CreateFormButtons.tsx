import { Stack } from "@mui/material";
import CustomButton from "../customButton";

interface IProps {
    setOpen: (open: boolean) => void;
    isLoading: boolean;
}

const CreateFormButtons = ({ isLoading, setOpen }: IProps) => {
    return (
        <Stack direction='row' gap='20px'>
            <CustomButton onClick={() => setOpen(false)} type="button" disabled={isLoading} variant="outlined">
                Отменить
            </CustomButton>
            <CustomButton isLoading={isLoading} variant="contained">
                Сохранить
            </CustomButton>
        </Stack>
    );
}

export default CreateFormButtons;