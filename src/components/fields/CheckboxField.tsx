import { Checkbox, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

interface IProps {
    onChange?: (value: boolean) => void;
    value?: boolean;
    id?: string;
    name?: string;
    stopPropagation?: boolean;
    checked?: boolean;
    disabled?: boolean;
}

type TEvent =
    | React.FormEvent<HTMLDivElement>
    | React.FormEvent<HTMLInputElement>
    | React.FormEvent<HTMLButtonElement>;

const CheckboxField = ({
    value = false,
    onChange = () => { },
    checked = false,
    id,
    name,
    stopPropagation = false,
    disabled = false
}: IProps) => {
    const [checkboxValue, setCheckboxValue] = useState<boolean>(value);

    const handleChange = (event: TEvent, value: boolean) => {
        if (stopPropagation) {
            event.stopPropagation();
        }
        setCheckboxValue(value);
        onChange(value);
    };

    useEffect(() => {
        setCheckboxValue(checked);
    }, [checked]);

    return (
        <IconButton
            disabled={disabled}
            onClick={(event) => handleChange(event, !checkboxValue)}
        >
            <Stack
                sx={{
                    width: 16,
                    height: 16,
                    border: "2px solid",
                    borderColor: checkboxValue ? "#2563EB" : "#94A3B8",
                    borderRadius: "4px",
                    p: "2px",
                    cursor: "pointer",
                    position: "relative",
                }}
            >
                <Stack
                    sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: checkboxValue ? "#2563EB" : "transparent",
                        borderRadius: "1px",
                    }}
                ></Stack>
                <Checkbox
                    size="small"
                    value={checkboxValue}
                    checked={checked}
                    id={id}
                    name={name}
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                    }}
                    disabled={disabled}
                />
            </Stack>
        </IconButton>
    );
};

export default CheckboxField;
