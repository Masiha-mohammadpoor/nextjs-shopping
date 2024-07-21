"use client";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/authService";
import SendOtpForm from "./sendOtpForm";
import CheckOtpForm from "./CheckOtpForm";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useRouter } from "next/navigation";

const RESEND_TIME = 90;

const Auth = () => {

  const router = useRouter();
  const queryClient = useQueryClient()
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);
  const { isPending: getOtpLoading, mutateAsync } = useMutation({
    mutationFn: getOtp,
  });
  const { isPending: checkOtpLoading, mutateAsync: checkOtpMutate } = useMutation({
      mutationFn: checkOtp,
    });

  useEffect(() => {
    const timer = time > 0 && setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => {
      if(timer) clearInterval(timer)
    }
  }, []);

  const phoneNumberHandler = (e) => {
    setPhoneNumber(toEnglishDigits(e.target.value));
  };

  const submitPhoneNumber = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync(phoneNumber);
      setOtp("");
      setStep(2);
      setTime(RESEND_TIME);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      // delete after
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    }
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    try {
      const {user , message} = await checkOtpMutate({phoneNumber , otp});
      toast.success(message);
      // queryClient.invalidateQueries({queryKey : ["get-user"]})

      if(user.isActive){
        router.replace("/");
        
      }else {
        router.push("/complete-profile")
      }
      setOtp("");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: {
        return (
          <SendOtpForm
            value={phoneNumber}
            onChange={phoneNumberHandler}
            onSubmit={submitPhoneNumber}
            isPending={getOtpLoading}
          />
        );
      }
      case 2: {
        return (
          <CheckOtpForm
            label="کد تایید"
            name="otpCode"
            value={toPersianDigits(otp)}
            onChange={(e) => setOtp(toEnglishDigits(e))}
            onSubmit={submitOtp}
            checkOtpLoading={checkOtpLoading}
            time={time}
            onResendOtp={submitPhoneNumber}
            setStep={setStep}
          />
        );
      }
    }
  };

  return (
    <section className="w-full h-screen pb-16 overflow-x-hidden overflow-y-scroll">
    <article className="w-[95%]  sm:w-96 glassmorphism py-6 px-7 rounded-xl mx-auto mt-8 sm:mt-16 flex justify-center flex-col items-center">
      <div className="w-full flex items-center justify-between mb-8">
        {step === 2 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="glassmorphism text--white p-2 rounded-xl"
          >
            <FaArrowRight />
          </button>
        ) : (
          <span className="inline-block w-6"> </span>
        )}
        <h1 className="text--white text-3xl font-bold">فرانت شاپ</h1>
        <span className="inline-block w-6"> </span>
      </div>
      <div className="w-full text--white text-lg flex justify-start mb-10">
        ورود | ثبت نام
      </div>
      <div className="w-full flex justify-center items-center">
        {renderStep()}
      </div>
    </article>
    </section>
  );
};

export default Auth;
