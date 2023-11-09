import { useId } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { customTextFieldStyle } from "./styles";
import { Controller } from "react-hook-form";
import ReactInputMask from "react-input-mask";

interface IProps {
    label?: string;
    name: string;
    errors?: any;
    disabled?: boolean;
    control: any;
    isUpdate?: boolean;
    defaultValue?: string | null;
    labelDisabled?: boolean;
    mask?: string;
    alwaysShowMask?: boolean;
    maskChar?: string;
}

const CustomMaskField = ({
    label,
    name,
    control,
    defaultValue = "",
    disabled = false,
    errors,
    labelDisabled,
    mask = "9999 9999 9999 9999",
    alwaysShowMask = false,
    maskChar = "_",
}: IProps) => {
    const id = useId();

    return (
        <Stack>
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
            <Controller
                control={control ?? {}}
                name={name}
                defaultValue={defaultValue}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                        <ReactInputMask
                            id={id}
                            mask={mask}
                            alwaysShowMask={alwaysShowMask}
                            maskChar={maskChar}
                            disabled={disabled}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value ?? defaultValue ?? ""}
                        >
                            {
                                (() => (
                                    <TextField
                                        id={id}
                                        sx={customTextFieldStyle(disabled)}
                                        disabled={disabled}
                                        error={!!errors?.[name]}
                                        inputProps={{
                                            sx: {
                                                height: "auto !important",
                                                py: "10px",
                                            },
                                            ref,
                                        }}
                                    />
                                )) as any
                            }
                        </ReactInputMask>
                    );
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

export default CustomMaskField;
