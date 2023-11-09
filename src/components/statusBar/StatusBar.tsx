import React from "react";
import { Alert, Snackbar } from "@mui/material";
import Icon from "../icon";
import { TStatus } from "@/interfaces";

interface IProps {
    status: TStatus;
    open: boolean;
    setOpen: (open: boolean) => void;
    text: string;
}

const StatusBar = ({ status, open, setOpen, text }: IProps) => {
    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    
    const statusBarData: { [key: string]: any } = {
        "SUCCESS": {
            iconPath: 'ic_circle-info',
            color: '#166534',
            bgcolor: '#BBF7D0'
        },
        'ERROR': {
            iconPath: 'ic_bold-danger',
            color: '#9F1239',
            bgcolor: '#FECDD3'
        }
    }

    const { iconPath, color, bgcolor } = statusBarData?.[status] || {};

    return (
        <>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    sx={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20,
                        minWidth: 320,
                        zIndex: 99,
                        p: '14px',
                        fontSize: 16,
                        fontWeight: 500,
                        color,
                        bgcolor,
                        alignItems: 'center',
                        borderRadius: '10px'
                    }}
                    icon={<Icon icon={iconPath} color={color} />}
                    severity="success"
                >
                    {text}
                </Alert>
            </Snackbar>
        </>
    );
}

export default StatusBar;