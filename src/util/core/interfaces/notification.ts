import { AlertColor } from "@mui/material";

export interface Notif {
    open: boolean;
    message: string;
    type: AlertColor
}