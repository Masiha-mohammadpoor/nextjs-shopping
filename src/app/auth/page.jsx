"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/authService";
import SendOtpForm from "./sendOtpForm";
import CheckOtpForm from "./CheckOtpForm";
import { toPersianDigits } from "@/utils/toPersianDigits";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step , setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const {isPending : getOtpLoading , mutateAsync} = useMutation({
    mutationFn : getOtp
  });
  const {isPending : checkOtpLoading , mutateAsync : checkOtpMutate} = useMutation({
    mutationFn : checkOtp
  });


  const phoneNumberHandler = (e) => {
    setPhoneNumber(toEnglishDigits(e.target.value));
  };

  const submitPhoneNumber = async (e) => {
    e.preventDefault();
    try {
      const {data : {data}} = await mutateAsync(phoneNumber);
      console.log(data);
      setPhoneNumber("");
      setStep(2);
    }catch(err){
      toast.error(err?.response?.data?.message);
      setStep(2);
    }
  };


  const submitOtp = async (e) => {
    e.preventDefault();
    try {
      const {data : {data}} = await checkOtpMutate(phoneNumber , otp);
      console.log(data);
      setOtp("");
    }catch(err){
      toast.error(err?.response?.data?.message);
    }

  }

  const renderStep = () => {
    switch(step){
      case 1 : {
        return <SendOtpForm
        label="شماره موبایل"
        name="phoneNumber"
        value={phoneNumber}
        onChange={phoneNumberHandler}
        onSubmit={submitPhoneNumber}
        isPending={getOtpLoading}
      />
      }
      case 2: {
        return <CheckOtpForm
        label="کد تایید"
        name="otpCode"
        value={toPersianDigits(otp)}
        onChange={(e) => setOtp(toEnglishDigits(e))}
        onSubmit={submitOtp}
        isPending={checkOtpLoading}
      />

      }
    }
  }


  return (
    <section className="w-96 glassmorphism py-6 px-7 rounded-xl mx-auto mt-16 flex justify-center flex-col items-center">
      <div className="w-full flex items-center justify-between mb-8">
        <button className="glassmorphism text--white p-2 rounded-xl">
          <FaArrowRight />
        </button>
        <h1 className="text--white text-3xl font-bold">فرانت شاپ</h1>
        <span className="inline-block w-6"> </span>
      </div>
      <div className="w-full text--white text-lg flex justify-start mb-10">
        ورود | ثبت نام
      </div>
      <div className="w-full flex justify-center items-center">
        {renderStep()}
      </div>
    </section>
  );
};

export default Auth;
