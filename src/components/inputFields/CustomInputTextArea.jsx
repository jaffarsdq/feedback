import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export default function CustomInputTextArea({
    row,
    label,
    placeholder,
    value,
    onChange,
    type,
}) {
    return (
        <FormControl
            variant="standard"
            sx={{
                margin: "4px 0px",
                padding: "7px 0",
                width: {
                    xs: "100%",
                    md: "100%",
                    lg: "100%",
                },
            }}
            color="secondary"
        >
            <InputLabel
                sx={{
                    fontFamily: "Poppins !important",
                    fontWeight: "700",
                    fontSize: "15px",
                    color: "white", // Label color
                    "&.Mui-focused": {
                        color: "white", // Label color when focused
                    },
                }}
                shrink
                htmlFor="bootstrap-input"
            >
                {label}
            </InputLabel>
            <OutlinedInput
                multiline
                rows={row ? row : 5}
                value={value}
                onChange={onChange}
                type={type}
                required
                sx={{
                    margin: "14px 0 0 0",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    "& input::placeholder": {
                        fontSize: "12px",
                        fontWeight: "700",
                        fontStyle: "italic",
                    },
                    "& input": {
                        fontSize: "14px",
                        fontWeight: "700",
                        fontStyle: "italic",
                    },
                    padding: "10px;",
                    "& fieldset": {
                        borderColor: "white", // Default border color
                    },
                    "&:hover fieldset": {
                        borderColor: "white", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "white", // Border color when focused
                        // boxShadow: "0 0 0 0.2rem rgba(255, 255, 255, 0.25)", // Optional: maintain a shadow effect
                    },
                    // Override the focus ring
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white", // Border color when not focused
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "white", // Border color for default state
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "white", // Border color for focused state
                            boxShadow: "0 0 0 0.2rem rgba(255, 255, 255, 0.25)", // Optional: shadow effect
                        },
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "12px",
                        fontWeight: "700",
                        fontStyle: "italic",
                    },
                    "& .MuiOutlinedInput-input": {
                        fontSize: "14px",
                        fontWeight: "700",
                        fontStyle: "italic",
                    },
                }}
                placeholder={placeholder ? placeholder : `Enter ${label}`}
            />
        </FormControl>
    );
}
