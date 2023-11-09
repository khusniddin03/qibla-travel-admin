import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Stack, Typography } from "@mui/material";
import useId from "@mui/material/utils/useId";
import { Controller } from "react-hook-form";
import PhoneInput, { CountryData } from "react-phone-input-2";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import ReactInputMask from "react-input-mask";
import "react-phone-input-2/lib/style.css";
import "./phoneField.css";

interface IProps {
  label: string;
  control: any;
  errors: any;
  yupSetValue: any;
  name: string;
  setPhoneNumberLength: (value: number) => void;
  disabled?: boolean;
  defaultValue?: string;
}

const PhoneField = ({
  label,
  control,
  errors,
  name,
  disabled,
  setPhoneNumberLength,
  defaultValue = '',
  yupSetValue
}: IProps) => {
  const id = useId() ?? "";
  const [format, setFormat] = useState("+999 99 999 99 99");
  const [dialCode, setDialCode] = useState("998");
  const mask =
    `+\\${dialCode.split("").join("\\")}` + format.slice(dialCode.length + 1);
  const [value, setValue] = useState<string>(defaultValue);
  const [focus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Stack
      sx={{
        pointerEvents: disabled ? 'none' : 'all',
      }}
    >
      <Stack>
        <label htmlFor={id}>
          <Typography
            variant="body2"
            sx={{ color: "#1E293B", fontWeight: "500" }}
          >
            {label}
          </Typography>
        </label>
      </Stack>
      <div data-id={id}>
        <PhoneInput
          buttonClass="phone-input-button"
          containerClass={`phone-input-container${errors[name]?.message ? " error" : ""
            }${focus ? " focus" : ""}`}
          containerStyle={{ backgroundColor: disabled ? "#E2E8F0" : "#F8FAFC" }}
          dropdownClass="phone-input-dropdown"
          searchClass="phone-input-search-input"
          country={"uz"}
          enableSearch={true}
          disableSearchIcon={true}
          searchNotFound="Не найдено"
          inputProps={{ hidden: true }}
          searchPlaceholder="Поиск"
          onChange={(_, options: CountryData) => {
            setDialCode(options.dialCode);
            setFormat(options.format.replace(/\./g, "9"));
            setValue("");
            yupSetValue(name, '');
            setPhoneNumberLength(formatPhoneNumber(options.format).length);
          }}
        />
      </div>
      <InputMask
        name={name}
        mask={mask}
        id={id}
        control={control}
        value={value}
        setValue={setValue}
        disabled={disabled}
        setFocus={setFocus}
      />
      {errors[name]?.message && (
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

interface IInputMaskProps {
  name: string;
  mask: string;
  id: string;
  control: any;
  value: string;
  disabled?: boolean;
  setValue: (value: string) => void;
  setFocus: (value: boolean) => void;
}

const InputMask = ({
  name,
  mask,
  id,
  control,
  value,
  setValue,
  setFocus,
  disabled = false,
}: IInputMaskProps) => {
  const [render, setRender] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.body.querySelector(
      `[data-id="${id}"] .phone-input-container`
    ) as HTMLDivElement;

    if (container) {
      setRender(container);
    }
  }, [id]);

  return (
    render &&
    createPortal(
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ref } }) => (
          <ReactInputMask
            id={id}
            className="phone-input-field"
            mask={mask}
            onChange={(event) => {
              onChange(formatPhoneNumber(event.target.value));
              setValue(event.target.value);
            }}
            inputRef={ref}
            alwaysShowMask={true}
            value={value}
            required
            disabled={disabled}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        )}
      />,
      render
    )
  );
};

export default PhoneField;
