import { FormControl, MenuItem, Select } from "@mui/material";

export default function CustomMonthPicker({ selectedMonth, onChange }) {
    const months = [
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" },
    ];

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <FormControl
            sx={{
                width: "296px",
                ".MuiInputBase-input": {
                    height: "5px",
                },
                ".MuiSelect-select": {
                    height: "10px", // Adjust the height here
                },
            }}
        >
            <Select
                value={selectedMonth}
                onChange={handleChange}
                placeholder="Select Month"
                style={{ height: "40px", width: "100%" }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: "150px", // Adjust the maximum height of the popup menu
                        },
                    },
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                    },
                }}
            >
                {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                        {month.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
