"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import Input from "@/common/Input";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const changeHandler = (e) => {
    setPhoneNumber(e.target.value);
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
        <form className="w-full flex flex-col">
          <Input
            label="شماره موبایل"
            name="phoneNumber"
            value={phoneNumber}
            onChange={changeHandler}
          />
          <button
            type="submit"
            className="mt-7 transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
          >
            ورود
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;