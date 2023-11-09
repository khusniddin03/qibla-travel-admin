import { ReactNode } from "react";
import { LoadingButton } from "@mui/lab";

interface IProps {
    isLoading?: boolean;
    disabled?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const ButtonIcon = ({
    isLoading = false,
    children,
    disabled = false,
    onClick,
    endIcon,
    startIcon,
}: React.PropsWithChildren<IProps>) => {
    return (
        <LoadingButton
            loading={isLoading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={onClick}
            startIcon={startIcon}
            endIcon={endIcon}
            sx={{
                bgcolor: "#FFF",
                color: "#1E293B",
                fontWeight: 500,
                fontSize: 16,
                boxShadow: "none",
                borderRadius: "8px",
                height: 44,
                border: "1px solid #E2E8F0",

                "&:hover": {
                    bgcolor: "#BFDBFE",
                },
                "&:focus-visible": {
                    border: "1px solid #93C5FD",
                    boxShadow: "none",
                },
                "&:active": {
                    background: "#93C5FD",
                },
                "&[disabled]": {
                    pointerEvents: "visible",
                    cursor: "not-allowed",
                    bgcolor: "#94A3B8",
                    color: "#475569",
                },
                "&.MuiLoadingButton-loading": {
                    color: "transparent",
                },
                "&.MuiLoadingButton-loading span": {
                    color: "#fff",
                },
                whiteSpace: "nowrap",
            }}
            disabled={disabled}
        >
            {children}
        </LoadingButton>
    );
};

export default ButtonIcon;
