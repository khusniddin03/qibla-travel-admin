import { Stack, Typography } from "@mui/material";
import Icon from "../icon";
import React from "react";

interface IProps {
    title: string;
    onClose: () => void;
    disabled?: boolean;
}

const ModalHeader = ({ title, onClose, children, disabled = false }: React.PropsWithChildren<IProps>) => {
    return (
        <Stack mb='14px'>
            <Stack
                p={0}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                {children}
                <Typography variant="h4" sx={{ fontWeight: 600, color: "#1E293B" }}>
                    {title}
                </Typography>

                <Stack
                    sx={{
                        cursor: disabled ? "default" : "pointer",
                    }}
                    onClick={disabled ? () => { } : onClose}
                >
                    <Icon icon="ic_close" width="30px" height="30px" />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ModalHeader;
