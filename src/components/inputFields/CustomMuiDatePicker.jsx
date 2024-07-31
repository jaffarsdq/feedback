import React from 'react';
import { FormControl, InputLabel } from '@mui/material';
import ResponsiveDatePickers from './DatePicker'; // Ensure this path is correct

export default function CustomMuiDatePicker({ font,label, value, onChange, px,width }) {
    return (
        <FormControl
            variant="standard"
            sx={{
                margin: "4px 0px",
                padding: "7px 0",
                paddingX: px ? px : 0,
                width: {
                    xs: "100%",
                    md: "100%",
                    lg: "100%",
                },
            }}
        >
            <InputLabel
                sx={{
                    fontFamily: "Poppins !important",
                    fontWeight: "700",
                    fontSize: "15px",
                }}
                shrink
                htmlFor="date-of-birth-picker"
            >
                {label}
            </InputLabel>
            <ResponsiveDatePickers
            width={width}
                value={value}
                onChange={onChange}
                required
                sx={{
                    margin: "14px 0 0 0",
                    backgroundColor: "white",
                    "&:focus": {
                        boxShadow: "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                        borderColor: "#1976d2",
                    },
                    height: "35px",
                    borderRadius: "4px",
                    "& input::placeholder": {
                        fontSize: "13px",
                        fontWeight: "bolder",
                    },
                    padding: "0px;",
                }}
                placeholder={`Enter ${label}`}
            />
        </FormControl>
    );
}
