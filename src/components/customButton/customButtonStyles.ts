export type ButtonName = "outlined" | "contained" | "text" | "danger" | 'primary';

export interface IButtonStyles {
    contained: any;
    outlined: any;
    text: any;
    danger: any;
    primary: any;
}

export const buttonStyles: IButtonStyles = {
    contained: {
        "&:hover": {
            bgcolor: "#1D4ED8",
        },
        "&:focus-visible": {
            border: "2px solid #93C5FD",
            boxShadow: 'none'
        },
        "&:focus-visible span": {
            display: "none",
        },
        "&:active": {
            background: "#1E40AF",
        },
        bgcolor: "#2563EB",
    },
    outlined: {
        "&:hover": {
            bgcolor: "#BFDBFE",
        },
        "&:focus-visible": {
            border: "2px solid #93C5FD",
            boxShadow: 'none'
        },
        "&:focus-visible span": {
            display: "none",
        },
        "&:active": {
            background: "#93C5FD",
        },
        bgcolor: "#DBEAFE",
        color: '#2563EB'
    },
    text: {
        "&:hover": {
            color: '#1D4ED8',
            bgcolor: "transparent",
        },
        "&:focus-visible": {
            border: "2px solid #3B82F6",
            boxShadow: 'none'
        },
        "&:focus-visible span": {
            display: "none",
        },
        "&:active": {
            color: '#1E40AF'
        },
        bgcolor: "transparent",
        color: '#2563EB'
    },
    danger: {
        "&:hover": {
            bgcolor: "#BE123C",
        },
        "&:focus-visible": {
            border: "2px solid #FDA4AF",
            boxShadow: 'none'
        },
        "&:focus-visible span": {
            display: "none",
        },
        "&:active": {
            background: "#9F1239",
        },
        bgcolor: "#E11D48",
    },
    primary: {
        "&:hover": {
            bgcolor: "#6D28D9",
        },
        "&:focus-visible": {
            border: "2px solid #C4B5FD",
            boxShadow: 'none'
        },
        "&:focus-visible span": {
            display: "none",
        },
        "&:active": {
            background: "#5B21B6",
        },
        bgcolor: "#7C3AED",
    },
};