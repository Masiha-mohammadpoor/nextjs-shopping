"use client";
import { toPersianDigits } from "@/utils/toPersianDigits";

const Input = ({ label, name, value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col">
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
          className="textField__input"
        />
      </div>
      <button
        type="submit"
        className="mt-7 transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
      >
        ورود
      </button>
    </form>
  );
};

export default Input;
