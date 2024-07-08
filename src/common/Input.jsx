"use client";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { BeatLoader } from "react-spinners";

const Input = ({ label, name, value, onChange, onSubmit , isPending}) => {

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#ffffff",
  };

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
        className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
      >
        {isPending ? 
        <BeatLoader
        color={"#ffffff"}
        loading={isPending}
        cssOverride={override}
        size={10}
      /> : "ورود"}
      </button>
    </form>
  );
};

export default Input;
