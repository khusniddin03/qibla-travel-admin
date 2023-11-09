import { Stack, Typography } from "@mui/material";
import CustomModal from "../customModal/CustomModal";
import Icon from "../icon";
import CustomButton from "../customButton";

interface IProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    onClose?: () => void;
    onConfirm?: () => void;
    isLoading?: boolean;
    bodyHiddenDisabled?: boolean;
}

const ConfirmModal = ({
    open,
    setOpen,
    onClose = () => { },
    onConfirm = () => { },
    isLoading = false,
    bodyHiddenDisabled = false
}: IProps) => {
    const onCloseHandler = () => {
        onClose();
        setOpen(false);
    };

    const onConfirmHandler = () => {
        onConfirm();
    };

    return (
        <CustomModal disabledClose={isLoading} bodyHiddenDisabled={bodyHiddenDisabled} open={open} setOpen={setOpen}>
            <Stack alignItems="center" textAlign="center">
                <Stack
                    sx={{
                        width: 44,
                        height: 44,
                        bgcolor: "#FECDD3",
                        borderRadius: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: "12px",
                    }}
                >
                    <Icon icon="ic_bold-danger" color="#E11D48" />
                </Stack>
                <Typography
                    variant="body2"
                    sx={{ color: "#1E293B", fontWeight: 600, fontSize: 18 }}
                >
                    Ishonchingiz komilmi?
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#1E293B",
                        fontWeight: 400,
                        fontSize: 16,
                        maxWidth: 400,
                    }}
                >
                    Bu amalni ortga qaytarib bo‘lmaydi. Ushbu maydon bilan bog'liq barcha qadriyatlar abadiy yo'qoladi.
                </Typography>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                    gap="16px"
                    mt="18px"
                >
                    <CustomButton
                        disabled={isLoading}
                        onClick={onCloseHandler}
                        variant="contained"
                    >
                        Отменить
                    </CustomButton>
                    <CustomButton
                        isLoading={isLoading}
                        onClick={onConfirmHandler}
                        variant="danger"
                    >
                        Удалить
                    </CustomButton>
                </Stack>
            </Stack>
        </CustomModal>
    );
};

export default ConfirmModal;
