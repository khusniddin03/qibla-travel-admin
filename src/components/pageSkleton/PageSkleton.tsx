import { Skeleton, Stack } from "@mui/material";

const PageSkleton = () => {
    return (
        <>
            <Stack height={89} px='20px' direction='row' justifyContent='space-between' alignItems='center'>
                <Skeleton width={320} variant="text" sx={{ fontSize: '1.5rem' }} />
                <Skeleton width={224} height={80} />
            </Stack>
            <Stack p='20px' direction='row' justifyContent='space-between' alignItems='center'>
                <Skeleton width={270} height={44} />
                <Stack direction='row' gap='18px'>
                    <Skeleton width={226} height={44} />
                    <Skeleton width={132} height={44} />
                </Stack>
            </Stack>
            <Stack px='20px'>
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={60} />
                <Skeleton height={60} />
            </Stack>
        </>
    );
}

export default PageSkleton;