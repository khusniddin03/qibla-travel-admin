import { Stack, TextField, Typography } from "@mui/material";
import useId from "@mui/material/utils/useId";
import _ from 'lodash';

interface IProps {
    label: string;
    register?: any;
    name: string;
    errors?: any;
    disabled?: boolean;
    width?: string | number;
    max?: string;
    min?: string;
    defaulValue?: string;
    labelDisabled?: boolean;
    required?: boolean;
}

const DatePickerField = ({
    label,
    register,
    name,
    errors,
    disabled = false,
    width = '100%',
    min = "1900-01-01",
    max = "2500-01-01",
    defaulValue = '',
    labelDisabled = false,
    required = false
}: IProps) => {
    const id = useId();
    const registerCheck = register ? register(name, required ? {required: true} : {}) : {};
    
    return (
        <Stack width={width}>
            <Stack>
                {!labelDisabled &&<label htmlFor={id}>
                    <Typography
                        variant="body2"
                        sx={{ color: "#1E293B", fontWeight: "500", mb: '3px' }}
                    >
                        {label}
                    </Typography>
                </label>}
            </Stack>
            <TextField
                {...registerCheck}
                error={!!_.get(errors, name)}
                id={id}
                name={name}
                disabled={disabled}
                type={"date"}
                placeholder={label}
                defaultValue={defaulValue}
                sx={{
                    bgcolor: "#F8FAFC",
                    mt: "0 !important",
                    borderRadius: "6px",
                    height: 44.4,
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
                        height: "auto !important",
                        pl: "44px",
                        py: "10px",
                        "&::-webkit-calendar-picker-indicator": {
                            color: "rgba(0, 0, 0, 0)",
                            display: "block",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 2V5' stroke='%231E293B' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M16 2V5' stroke='%231E293B' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M3.5 9.08997H20.5' stroke='%231E293B' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z' stroke='%231E293B' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15.6947 13.7H15.7037' stroke='%231E293B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15.6947 16.7H15.7037' stroke='%231E293B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.9955 13.7H12.0045' stroke='%231E293B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.9955 16.7H12.0045' stroke='%231E293B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.29431 13.7H8.30329' stroke='%231E293B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.29431 16.7H8.30329' stroke='%231E293B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")`,
                            backgroundRepeat: "no-repeat",
                            width: "24px",
                            height: "24px",
                            position: "absolute",
                            left: "10px",
                            margin: 0,
                        },
                    },
                    min,
                    max
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {_.get(errors, name) && (
                <Typography
                    variant="body2"
                    sx={{ color: "#FF4842", fontWeight: "500" }}
                >
                    {_.get(errors, name)?.message}
                </Typography>
            )}
        </Stack>
    );
};

export default DatePickerField;
