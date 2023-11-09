import { LoadingButton } from "@mui/lab";
import { ButtonName, buttonStyles } from "./customButtonStyles";

interface IProps {
    isLoading?: boolean;
    variant: ButtonName;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    width?: string;
    type?: "submit" | "button" | "reset";
}

const CustomButton = ({
    isLoading = false,
    children,
    variant = "contained",
    disabled = false,
    onClick,
    width = '100%',
    type = 'submit'
}: React.PropsWithChildren<IProps>) => {
    return (
        <LoadingButton
            loading={isLoading}
            fullWidth
            size="large"
            type={type}
            variant="contained"
            onClick={onClick}
            sx={{
                ...buttonStyles[variant],
                fontWeight: 600,
                fontSize: 16,
                boxShadow: "none",
                borderRadius: '8px',
                width: width,
                "&[disabled]": {
                    pointerEvents: "visible",
                    cursor: "not-allowed",
                    bgcolor: "#94A3B8",
                    color: "#475569",
                },
                '&.MuiLoadingButton-loading': {
                    color: 'transparent'
                },
                '&.MuiLoadingButton-loading span': {
                    color: '#fff'
                },
                whiteSpace: 'nowrap',
                border: '3px solid transparent'
            }}
            disabled={disabled}
        >
            {children}
        </LoadingButton>
    );
};

export default CustomButton;
