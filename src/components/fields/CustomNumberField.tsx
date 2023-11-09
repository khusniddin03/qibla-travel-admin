import {
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import useId from "@mui/material/utils/useId";
import React, { useState } from "react";

interface IProps {
    label: string;
    register?: any;
    name: string;
    errors?: any;
    disabled?: boolean;
    labelDisabled?: boolean;
    width?: string;

}

const CustomNumberField = ({
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
    const [value, setValue] = useState<string>('');

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        const isNegative = inputValue[0] === "-";
        const sanitizedInput = inputValue.replace(/[^\d.-?]/g, "");
        const parts = sanitizedInput.split(".");

        if (parts.length > 2) {
            setValue(parts[0] + "." + parts.slice(1).join(""))
        }

        if (isNegative) {
            setValue("-" + sanitizedInput.replace(/-?/g, ""))
        }

        if (isNegative) {
            if (/-\./i.test(sanitizedInput)) {
                setValue(sanitizedInput.replace(".", ""))
            }
        }

        if (sanitizedInput.indexOf("=") !== -1) {
            setValue(sanitizedInput.replace("=", ""))
        }
    }

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
                error={!!errors?.[name]}
                id={id}
                onInput={handleInputChange}
                value={value}
                name={name}
                disabled={disabled}
                type={'text'}
                placeholder={label}
                autoComplete="off"
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
                        py: "10px",
                    },
                }}
            />
            {errors?.[name]?.message && (
                <Typography
                    variant="body2"
                    sx={{ color: "#FF4842", fontWeight: "500" }}
                >
                    {errors?.[name]?.message}
                </Typography>
            )}
        </Stack>
    );
};

export default CustomNumberField;
