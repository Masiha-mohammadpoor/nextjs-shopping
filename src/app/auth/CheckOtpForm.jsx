"use client";
import OtpInput from 'react-otp-input';
import { toPersianDigits } from "@/utils/toPersianDigits";
import { BeatLoader } from "react-spinners";


const CheckOtpForm = ({ label, name, value, onChange, onSubmit , checkOtpLoading}) => {
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col">
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="text--white mb-3 text-sm">
        {label}
      </label>
      <OtpInput
      value={value}
      onChange={onChange}
      numInputs={6}
      renderInput={(props) => <input  {...props} />}
      containerStyle={{display:"flex" , justifyContent : "space-between"}}
      inputStyle={{width:"40px",height:"40px" , borderRadius : "8px" , outline : "none" , transition : "all" , transitionDuration : "300ms" , backgroundColor : "rgba(255 , 255 , 255 , 0.2)" , backdropFilter : "blur(4px)" , color : "white"}}
      />
    </div>
    <button
      type="submit"
      className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
    >
      {checkOtpLoading ? 
      <BeatLoader
      color={"#ffffff"}
      loading={checkOtpLoading}
      cssOverride={override}
      size={10}
    /> : "ورود"}
    </button>
  </form>

  );
}
 
export default CheckOtpForm;