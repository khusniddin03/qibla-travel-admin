import Select from "react-select";
import { MenuItem, Stack, Typography } from "@mui/material";
import { forwardRef, useId } from "react";
import { customSelectStyles } from "./customSelectStyles";
import Icon from "../icon";
import "./customSelect.css";

interface IProps {
    label: string;
    name: string;
    errors?: any;
    onChange?: (value: any) => void;
    onBlur?: (value: any) => void;
    data?: any[];
    value?: string;
    width?: string | number;
    placeholderType?: boolean;
    bodyHiddenDisabled?: boolean;
    addButton?: boolean;
    addButtonText?: string;
    addButtonClick?: () => void;
    disabled?: boolean;
    openSelect?: boolean;
    valueKey?: string;
    labelKey?: string;
    disableValue?: string | number;
    render?: (value: any) => string;
    type?: "string" | "number";
}

const CustomOption = ({
    innerProps,
    data,
    selectProps,
    isSelected,
    children,
    isDisabled
}: any) => {
    const render = selectProps?.["data-render"];
    const addButton = data?.["addButton"];
    const addButtonClick = data?.["addButtonClick"];
    const addButtonText = data?.["addButtonText"];

    if (addButton) {
        return (
            <MenuItem
                sx={{
                    px: "14px",
                    py: "7px",
                }}
                onClick={addButtonClick}
            >
                <Stack
                    sx={{ cursor: "pointer" }}
                    direction="row"
                    gap={1}
                    alignItems="center"
                >
                    <Icon width="22px" height="22px" icon="ic_pluse" color="#2563EB" />
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            color: "#2563EB",
                            fontSize: 16,
                            userSelect: "none",
                        }}
                    >
                        {addButtonText}
                    </Typography>
                </Stack>
            </MenuItem>
        );
    }

    return (
        <MenuItem
            sx={{
                px: "14px",
                py: "7px",
                bgcolor: isSelected ? "#EFF6FF" : "#fff",
                fontSize: 16,
                fontWeight: 400,
                color: isSelected ? "#2563EB" : "#1E293B",
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? .5 : 1,
                pointerEvents: isDisabled ? 'none' : 'visible'
            }}
            {...innerProps}
        >
            {render ? render(data) : children}
        </MenuItem>
    );
};

const CustomSelect = forwardRef(
    (
        {
            onChange,
            onBlur,
            label,
            name,
            errors,
            data = [],
            value = "",
            width = "100%",
            placeholderType = false,
            // bodyHiddenDisabled = true,
            addButton = false,
            addButtonText = "Add item",
            addButtonClick = () => { },
            disabled = false,
            valueKey = "value",
            labelKey = "label",
            disableValue = "",
            render,
            type,
        }: IProps,
        ref: any
    ) => {
        const currentValue =
            value ?? true ? (type === "number" ? Number(value) : String(value)) : "";
        const id = useId();

        const options = addButton
            ? [
                {
                    addButton,
                    addButtonClick,
                    addButtonText,
                },
                ...data,
            ]
            : data;

        return (
            <Stack sx={{ minWidth: width, width }}>
                {placeholderType && (
                    <label htmlFor={id}>
                        <Typography
                            variant="body2"
                            sx={{ color: "#1E293B", fontWeight: "500", mb: "3px" }}
                        >
                            {label}
                        </Typography>
                    </label>
                )}
                <Select
                    id={id}
                    name={name}
                    options={options}
                    onChange={(event: any) => {
                        const currentValue =
                            type === "number"
                                ? Number(event[valueKey] ?? 0)
                                : String(event[valueKey] ?? "");
                        onChange && onChange(currentValue);
                    }}
                    onBlur={onBlur}
                    value={data.find((item) => item?.[valueKey] === currentValue)}
                    isOptionDisabled={(option) => {
                        return option?.[valueKey ?? "id"] === disableValue;
                    }}
                    ref={ref}
                    isSearchable
                    getOptionLabel={(option: { [key: string]: string }) =>
                        render ? render(option) : option?.[labelKey ?? "name"] ?? ""
                    }
                    getOptionValue={(option: { [key: string]: string }) =>
                        option?.[valueKey ?? "id"] ?? ""
                    }
                    isDisabled={disabled}
                    styles={customSelectStyles(!!errors?.[name])}
                    components={{ Option: CustomOption }}
                    data-labelKey={labelKey}
                    data-render={render}
                    data-add-button={addButton}
                    data-add-button-click={addButtonClick}
                    data-add-button-text={addButtonText}
                    noOptionsMessage={() => "Пока нет данных"}
                    placeholder={label}
                    className={disabled ? "custom-select disabled" : "custom-select"}
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
    }
);

export default CustomSelect;
