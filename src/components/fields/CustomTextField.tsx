import { Stack, TextField, Typography } from "@mui/material";
import useId from "@mui/material/utils/useId";
import { customTextFieldStyle } from "./styles";
import get from 'lodash/get'

interface IProps {
    label: string;
    register?: any;
    name: string;
    errors?: any;
    disabled?: boolean;
    labelDisabled?: boolean;
    width?: string;
    defaultValue?: string;
}

const CustomTextField = ({
    label,
    register,
    name,
    errors,
    disabled = false,
    labelDisabled = false,
    width = "100%",
    defaultValue = ''
}: IProps) => {
    const id = useId();
    const registerCheck = register ? register(name) : {};

    return (
        <Stack width={width}>
            <Stack>
                {!labelDisabled && (
                    <label htmlFor={id}>
                        <Typography
                            variant="body2"
                            sx={{ color: "#1E293B", fontWeight: "500", mb: "3px" }}
                        >
                            {label}
                        </Typography>
                    </label>
                )}
            </Stack>
            <TextField
                {...registerCheck}
                error={!!get(errors, name)}
                id={id}
                name={name}
                disabled={disabled}
                type={"text"}
                placeholder={label}
                autoComplete="off"
                defaultValue={defaultValue}
                sx={customTextFieldStyle(disabled)}
                inputProps={{
                    sx: {
                        height: "auto !important",
                        py: "10px",
                    },
                }}
            />
            {get(errors, name)?.message && (
                <Typography
                    variant="body2"
                    sx={{
                        color: "#FF4842",
                        fontWeight: "500",
                        wordBreak: "break-word",
                        maxWidth: '100%'
                    }}
                >
                    {get(errors, name)?.message}
                </Typography>
            )}
        </Stack>
    );
};

export default CustomTextField;
