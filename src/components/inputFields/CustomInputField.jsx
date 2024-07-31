import {
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import PropTypes from "prop-types";

export default function CustomInputField({
    label,
    value,
    onChange,
    type,
    px,
    wlg,
    wmd,
    wxs,
    height,
    disabled,
    error,
    helperText,
    required,
    maxLength,
    minLength,
    max,
    min,
    ...rest
}) {
    const handleChange = (event) => {
        const { value } = event.target;

        if (type === "number") {
            if (maxLength && value.length > maxLength) {
                return;
            }
        }

        onChange(event);
    };

    return (
        <FormControl
            variant="standard"
            sx={{
                margin: "4px 0px",
                padding: "7px 0",
                paddingX: px ? px : 0,
                width: {
                    xs: wxs ? wxs : "100%",
                    md: wmd ? wmd : "100%",
                    lg: wlg ? wlg : "100%",
                },
            }}
            error={error}
            {...rest}
        >
            <InputLabel
                sx={{
                    fontFamily: "Poppins !important",
                    fontWeight: "700",
                    fontSize: "15px",
                }}
                shrink
                htmlFor="bootstrap-input"
            >
                {label}
            </InputLabel>
            <OutlinedInput
                value={value}
                onChange={handleChange}
                type={type}
                required={required}
                sx={{
                    "& input[type=number]": {
                        "-moz-appearance": "textfield",
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                        "-webkit-appearance": "none",
                        margin: 0,
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                        "-webkit-appearance": "none",
                        margin: 0,
                    },
                    margin: "14px 0 0 0",
                    backgroundColor: "white",
                    "&:focus": {
                        boxShadow: "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                        borderColor: "#1976d2",
                    },
                    height: height ? height : "35px",
                    borderRadius: "4px",
                    "& input::placeholder": {
                        fontSize: "13px",
                        fontWeight: "bolder",
                    },
                    padding: "0px;",
                }}
                placeholder={`Enter ${label}`}
                disabled={disabled}
                inputProps={{
                    maxLength: maxLength,
                    minLength: minLength,
                    max: max,
                    min: min,
                }}
            />
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}

CustomInputField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    px: PropTypes.string,
    wlg: PropTypes.string,
    wmd: PropTypes.string,
    wxs: PropTypes.string,
    height: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    required: PropTypes.bool,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
};
