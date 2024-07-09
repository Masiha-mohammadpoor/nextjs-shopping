"use client"
import { toPersianDigits } from "@/utils/toPersianDigits";

const Input = ({name , label , value , onChange}) => {
  return (
    <>
      <label htmlFor={name} className="text-white mb-3 text-sm">
        {label}
      </label>
      <input
        type="text"
        id={name}
        value={toPersianDigits(value)}
        dir="ltr"
        onChange={onChange}
        autoComplete="off"
        className="textField__input"
      />
    </>
  );
};

export default Input;
