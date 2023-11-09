import { useState } from "react";
import {
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import useId from "@mui/material/utils/useId";
import Iconify from "../iconify/Iconify";
// import Icon from "../icon/Icon";

interface IProps {
    label: string;
    register?: any;
    name: string;
    errors?: any;
    disabled?: boolean;
}

const PasswordField = ({ label, register, name, errors, disabled = false }: IProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const id = useId();
    const registerCheck = register ? register(name) : {};

    return (
        <Stack>
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
            <TextField
                {...registerCheck}
                error={!!errors?.[name]}
                id={id}
                name={name}
                disabled={disabled}
                type={showPassword ? "text" : "password"}
                placeholder={label}
                sx={{
                    bgcolor: "#F8FAFC",
                    mt: "0 !important",
                    borderRadius: "6px",
                    height: 44.4,
                    '& *': disabled ? {
                        cursor: 'not-allowed',
                        pointerEvents: 'none',
                    } : {},
                    cursor: disabled ? 'not-allowed' : 'default',
                    '& > div:hover fieldset': {
                        borderColor: '#CBD5E1 !important'
                    },
                    '& > div.Mui-focused:hover fieldset': {
                        borderColor: '#2563EB !important'
                    },
                    '& > div.Mui-focused fieldset': {
                        borderColor: '#2563EB !important',
                        boxShadow: '0px 0px 0px 2px rgba(37, 99, 235, 0.35)'
                    },
                    '& > div.Mui-disabled': {
                        bgcolor: '#E2E8F0',
                    },
                    '& > div.Mui-disabled fieldset': {
                        borderColor: '#E2E8F0 !important'
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                <Iconify
                                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                    // startAdornment: (
                    //     <InputAdornment position="start">
                    //         <Stack width="22px" height="22px" color="#64748B">
                    //             <label htmlFor={id}>
                    //                 <Icon icon="ic_lock" />
                    //             </label>
                    //         </Stack>
                    //     </InputAdornment>
                    // ),
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

export default PasswordField;
