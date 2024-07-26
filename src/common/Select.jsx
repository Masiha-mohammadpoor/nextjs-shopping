"use client";
import Select from "react-select";
import { SelectStyles } from "@/constants/SelectStyles";

const SelectOption = ({onChange , options , value , defaultValue}) => {
  return (
    <Select
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      getOptionLabel={(option) => option.title}
      getOptionValue={(option) => option._id}
      options={options}
      menuPlacement="auto"
      placeholder="انتخاب کنید ..."
      styles={SelectStyles}
    />
  );
};

export default SelectOption;
