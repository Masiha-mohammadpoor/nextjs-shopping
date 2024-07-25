"use client";
import Select from "react-select";

const SelectOption = ({onChnage , options , label , value}) => {
  return (
    <Select
      onChange={onChnage}
      options={options}
      getOptionLabel={(option) => option[label]}
      getOptionValue={(option) => option[value]}
      placeholder="انتخاب کنید ..."
      styles={{
        container: (baseStyles, state) => ({
          ...baseStyles,
          border: 0,
          outline: 0,
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          color: "white",
          border: "none",
          outline: "none",
          "&:hover": {
            color: "white",
          },
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "#ffffff33",
          display: "flex",
          borderRadius: "0.75rem",
          padding: "0.2rem 0",
          backdropFilter: "blur(16px)",
          color: "#fff",
          border: 0,
          boxShadow: "none",
          outline: 0,
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          color: "#fff",
          "&:focus": {
            padding: 0,
            margin: 0,
          },
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
          color: "#fff",
          backgroundColor: "#ffffff33",
          backdropFilter: "blur(16px)",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isSelected ? "#ffffff33" : "transparent",
          "&:hover": {
            backgroundColor: "#ffffff33",
            backdropFilter: "blur(16px)",
          },
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: "white",
        }),
      }}
    />
  );
};

export default SelectOption;
