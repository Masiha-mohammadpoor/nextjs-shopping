"use client";
import Input from "@/common/Input";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { BeatLoader } from "react-spinners";

const SendOtpForm = ({ value, onChange, onSubmit, getOtpLoading }) => {

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col">
      <div className="w-full flex flex-col">
        <Input
          name="phoneNumber"
          label="شماره موبایل"
          value={toPersianDigits(value)}
          onChange={onChange}
        />
      </div>
      <button
        type="submit"
        className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
      >
        {getOtpLoading ? (
          <BeatLoader
            color={"#ffffff"}
            loading={getOtpLoading}
            size={10}
          />
        ) : (
          "ورود"
        )}
      </button>
    </form>
  );
};

export default SendOtpForm;
