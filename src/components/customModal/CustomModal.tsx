import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { bodyHiddenHandler } from "../../utils/bodyHidden";
import { Stack } from "@mui/material";

const boxStyle = {
    bgcolor: "#FFF",
    borderRadius: "7px",
    boxShadow: 24,
    py: "28px",
    px: "20px",
    outline: "none",
    pointerEvents: "visible",
};

interface IProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    bodyHiddenDisabled?: boolean;
    onClose?: () => void;
    width?: number | string;
    columns?: string;
    disabledClose?: boolean;
}

export default function CustomModal({
    open = false,
    setOpen,
    children,
    bodyHiddenDisabled = false,
    onClose = () => { },
    width = 460,
    columns,
    disabledClose = false
}: React.PropsWithChildren<IProps>) {
    const handleClose = () => {
        if (!disabledClose) {
            setOpen(false);
            onClose();
        }
    };

    const columnsStyle = {
        gridTemplateColumns: columns
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            onTransitionExited={
                bodyHiddenDisabled ? undefined : () => bodyHiddenHandler()
            }
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            BackdropProps={{
                sx: {
                    backgroundColor: "rgba(99, 109, 118, 0.24)",
                    backdropFilter: "blur(3px)",
                },
            }}
            slotProps={{
                backdrop: {
                    timeout: 300,
                },
            }}
        >
            <Fade in={open}>
                <Stack
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        overflowY: "auto",
                        display: "grid",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px 0",
                        width: "100%",
                        bgcolor: "transparent",
                        height: "100vh",
                        ...columnsStyle
                    }}
                >
                    <Box onClick={(event) => event.stopPropagation()} sx={{ ...boxStyle, minWidth: width }}>
                        {children}
                    </Box>
                </Stack>
            </Fade>
        </Modal>
    );
}
