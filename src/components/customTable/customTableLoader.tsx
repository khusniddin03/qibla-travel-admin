import { CircularProgress, Stack } from "@mui/material";

const CustomTableLoader = () => {
    return (
        <Stack alignItems="center" justifyContent="center">
            <CircularProgress />
        </Stack>
    );
};

export default CustomTableLoader;
