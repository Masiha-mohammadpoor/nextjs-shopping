"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import Input from "@/common/Input";
import http from "@/services/httpServices";
import toast from "react-hot-toast";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const changeHandler = (e) => {

    setPhoneNumber(toEnglishDigits(e.target.value));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const {data : {data}} = await http.post("/user/get-otp" , {phoneNumber});
      console.log(data);
      setPhoneNumber("")
    }catch(err){
      toast.error(err?.response?.data?.message);
    }
  };

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
        <Input
          label="شماره موبایل"
          name="phoneNumber"
          value={phoneNumber}
          onChange={changeHandler}
          onSubmit={submitHandler}
        />
      </div>
    </section>
  );
};

export default Auth;
