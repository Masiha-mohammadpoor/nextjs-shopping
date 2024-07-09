"use client";
import { toPersianDigits } from "@/utils/toPersianDigits";
import OtpInput from "react-otp-input";
import { BeatLoader } from "react-spinners";
import { CiEdit } from "react-icons/ci";

const CheckOtpForm = ({
  label,
  name,
  value,
  onChange,
  onSubmit,
  checkOtpLoading,
  time,
  onResendOtp,
  setStep
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col">
      <div className="w-full flex flex-col">
        <label htmlFor={name} className="text--white mb-3 flex justify-between text-sm">
          <span>{label}</span>
          <span><button onClick={() => setStep(s => s-1)} className="text-blue-800 flex items-center">ویرایش شماره موبایل <CiEdit className="mr-2"/></button></span>
        </label>
        <OtpInput
          value={value}
          onChange={onChange}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          containerStyle={{
            display: "flex",
            justifyContent: "space-between",
            direction: "ltr",
          }}
          inputStyle={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            outline: "none",
            transition: "all",
            transitionDuration: "300ms",
            backgroundColor: "rgba(255 , 255 , 255 , 0.2)",
            backdropFilter: "blur(4px)",
            color: "white",
          }}
        />
      </div>
      {time > 0 ? (
        <p className="flex justify-center mt-4 text--white">
          <span className="inline-block w-5 ml-1"> {toPersianDigits(time)} </span> تا
          ارسال مجدد کد
        </p>
      ) : (
        <button
          className="flex justify-center mt-4 text--white text-blue-800 font-bold"
          onClick={onResendOtp}
        >
          ارسال مجدد کد
        </button>
      )}
      <button
        type="submit"
        className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
      >
        {checkOtpLoading ? (
          <BeatLoader
            color={"#ffffff"}
            loading={checkOtpLoading}
            size={10}
          />
        ) : (
          "ورود"
        )}
      </button>
    </form>
  );
};

export default CheckOtpForm;
