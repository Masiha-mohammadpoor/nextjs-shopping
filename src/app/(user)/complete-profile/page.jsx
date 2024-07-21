"use client";
import Input from "@/common/Input";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CompleteProfile = () => {
  const router = useRouter();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: completeProfile,
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const {user , message} = await mutateAsync(values);
      toast.success(message);
      if (user.isActive) router.push("/");
      window.location.reload();
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section className="w-full h-screen pb-20 overflow-x-hidden overflow-y-scroll">
    <article className="w-[95%] sm:w-96 glassmorphism py-6 px-7 rounded-xl mx-auto mt-10 flex justify-center flex-col items-center">
      <div className="w-full flex items-center justify-center mb-8">
        <h1 className="text--white text-3xl font-bold">فرانت شاپ</h1>
      </div>
      <div className="w-full text--white text-lg flex justify-start mb-10">
        تکمیل اطلاعات
      </div>
      <form
        onSubmit={submitHandler}
        className="w-full flex flex-col justify-center items-start gap-y-4"
      >
        <div className="w-full">
          <Input
            name="name"
            label="نام و نام‌خانوادگی"
            value={values.name}
            onChange={changeHandler}
          />
        </div>
        <div className="w-full">
          <Input
            name="email"
            label="ایمیل"
            value={values.email}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
        >
          {isPending ? (
            <BeatLoader color={"#ffffff"} loading={isPending} size={10} />
          ) : (
            "ورود"
          )}
        </button>
      </form>
    </article>
    </section>
  );
};

export default CompleteProfile;
