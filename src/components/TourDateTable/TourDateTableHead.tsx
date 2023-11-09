import { Stack } from "@mui/material";

const TransactionProjectTableHead = () => {
    return (
        <>
            <Stack
                sx={{
                    bgcolor: "#F8FAFC",
                    px: 2,
                    py: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRight: '1px solid #CBD5E1'
                }}
            >
                Sana
            </Stack>
            <Stack
                sx={{
                    bgcolor: "#F8FAFC",
                    px: 2,
                    py: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRight: '1px solid #CBD5E1'
                }}
            >
                Joylar soni
            </Stack>
            <Stack
                sx={{
                    bgcolor: "#F8FAFC",
                    px: 2,
                    py: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRight: '1px solid #CBD5E1'
                }}
            >
                Davomiyligi
            </Stack>
            <Stack
                sx={{
                    bgcolor: "#F8FAFC",
                    px: 2,
                    py: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                }}
            ></Stack>
        </>
    );
};

export default TransactionProjectTableHead;
