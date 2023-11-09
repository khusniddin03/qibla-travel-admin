import { Stack, Typography } from "@mui/material";

interface IProps {
    title: string;
}

const PageHeader = ({ title, children }: React.PropsWithChildren<IProps>) => {
    return (
        <Stack px={2.5}>
            <Stack
                py={2.5}
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <Typography variant="h4" sx={{ fontWeight: 500, color: "#1E293B" }}>
                    {title}
                </Typography>

                {children}
            </Stack>
        </Stack>
    );
}

export default PageHeader;