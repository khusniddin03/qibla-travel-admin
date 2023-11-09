import {
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import useId from "@mui/material/utils/useId";
import _ from 'lodash';

interface IProps {
    label: string;
    register?: any;
    name: string;
    errors?: any;
    disabled?: boolean;
    labelDisabled?: boolean;
    width?: string;

}

const CustomTextareaField = ({
    label,
    register,
    name,
    errors,
    disabled = false,
    labelDisabled = false,
    width = '100%'
}: IProps) => {
    const id = useId();
    const registerCheck = register ? register(name) : {};
    const error = _.get(errors, name);
    return (
        <Stack width={width}>
            <Stack>
                {!labelDisabled && <label htmlFor={id}>
                    <Typography
                        variant="body2"
                        sx={{ color: "#1E293B", fontWeight: "500", mb: '3px' }}
                    >
                        {label}
                    </Typography>
                </label>
                }
            </Stack>
            <TextField
                {...registerCheck}
                error={!!error}
                id={id}
                name={name}
                disabled={disabled}
                type={'text'}
                multiline
                placeholder={label}
                autoComplete="off"
                sx={{
                    bgcolor: "#F8FAFC",
                    mt: "0 !important",
                    borderRadius: "6px",
                    "& *": disabled
                        ? {
                            cursor: "not-allowed",
                            pointerEvents: "none",
                        }
                        : {},
                    cursor: disabled ? "not-allowed" : "default",
                    "& > div:hover fieldset": {
                        borderColor: "#CBD5E1 !important",
                    },
                    "& > div.Mui-focused:hover fieldset": {
                        borderColor: "#2563EB !important",
                    },
                    "& > div.Mui-focused fieldset": {
                        borderColor: "#2563EB !important",
                        boxShadow: "0px 0px 0px 2px rgba(37, 99, 235, 0.35)",
                    },
                    "& > div.Mui-disabled": {
                        bgcolor: "#E2E8F0",
                    },
                    "& > div.Mui-disabled fieldset": {
                        borderColor: "#E2E8F0 !important",
                    },
                }}
                inputProps={{
                    sx: {
                        height: "106px !important",
                    },
                }}
            />
            {error?.message && (
                <Typography
                    variant="body2"
                    sx={{ color: "#FF4842", fontWeight: "500" }}
                >
                    {error?.message}
                </Typography>
            )}
        </Stack>
    );
};

export default CustomTextareaField;
