"use client";
import { toPersianDigits } from "@/utils/toPersianDigits";

const Input = ({ label, name, value, onChange }) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="text--white mb-3 text-sm">
        {label}
      </label>
      <input
        type="text"
        id={name}
        value={toPersianDigits(value)}
        onChange={onChange}
        autoComplete="off"
        className="w-full tracking-widest transition-all duration-300 glassmorphism outline-none px-3 py-2 text--white rounded-xl focus:bg-opacity-25"
      />
    </div>
  );
};

export default Input;
