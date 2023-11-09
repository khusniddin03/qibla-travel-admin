export const customTextFieldStyle = (disabled: boolean) => ({
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
})