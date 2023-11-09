import { Stack, Typography } from "@mui/material";

const CustomTableError = () => {
    return (
        <Stack alignItems="center" justifyContent="center">
            <Typography
                variant="body2"
                sx={{ color: "#FF4842", fontWeight: "500", fontSize: 16 }}
            >
                Oбновить страницу или попробуйте позже 
            </Typography>
        </Stack>
    );
};

export default CustomTableError;
