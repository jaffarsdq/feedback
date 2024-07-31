import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useEffect } from "react";

export default function AlertPop({ boolean, msg, status }) {
    const [open, setOpen] = React.useState(boolean);

    useEffect(() => {
        setOpen(boolean);
    }, [boolean]);

    const [state, setState] = React.useState({
        vertical: "top",
        horizontal: "center",
    });
    const { vertical, horizontal } = state;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                key={vertical + horizontal}
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={status}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
