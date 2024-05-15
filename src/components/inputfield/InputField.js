import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";

UserInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  questionCode:PropTypes.bool,
};

export default function UserInput({
  name,
  label,
  options,
  size,
  disabled,
  handleChange,
  questionCode
}) {
  const [value, setValue] = useState("");
  const { control } = useFormContext();
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <FormControl sx={{ width: "100%" }} size={size} fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        value={value}
        disabled={disabled}
        fullWidth
        sx={{ width: "200px" }}
        onChange={(e) => {
          handleChange(e.target.value);
          setValue(e.target.value);
        }}
        label={label}
        labelId={label}
      >
        {options?.map((item, index) => (
          <MenuItem key={index} value={item} title={questionCode?"This code is combination of domain and level":''}>
            
            {capitalizeFirstLetter(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
