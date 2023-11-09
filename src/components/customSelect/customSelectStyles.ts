import { StylesConfig } from "react-select";

const styles: StylesConfig<any> = {
    control: (styles, state) => ({
        ...styles,
        backgroundColor: "#F8FAFC",
        height: 44,
        padding: "0 14px",
        borderRadius: 8,
        borderWidth: '1px',
        boxShadow: state.isFocused ? '0px 0px 0px 2px rgba(37, 99, 235, 0.35)' : 'none',
        borderColor: state.isFocused ? '#2563EB' : '#CBD5E1',
    }),
    placeholder: (styles) => ({
        ...styles,
        fontSize: "16px",
        fontWeight: 400,
        color: "#475569",
    }),
    valueContainer: (styles) => ({ ...styles, padding: 0, gap: "5px" }),
    dropdownIndicator: (styles) => ({
        ...styles,
        paddingRight: 0,
        color: "#475569",
        svg: {
            width: 20,
            height: 20,
        },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    singleValue: (base) => ({
        ...base,
        color: '#1E293B'
    }),
    indicatorsContainer: (base) => ({
        ...base,
        '& *': {
            color: '#475569'
        }
    })
};

const errorStyle = {
    control: (styles: any) => ({
        ...styles,
        backgroundColor: "#F8FAFC",
        height: 44,
        padding: "0 16px",
        borderRadius: 8,
        border: '1px solid red !important',
    })
}

export const customSelectStyles = (validation: boolean) => validation ? { ...styles, ...errorStyle } : styles;        