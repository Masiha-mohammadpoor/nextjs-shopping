"use client";
import Input from "@/common/Input";
import useGetUser from "@/hooks/useAuth";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { updateUser } from "@/services/authService";
import toast from "react-hot-toast";

const Me = () => {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  const { isPending , mutateAsync} = useMutation({
    mutationFn : updateUser
  });
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    biography: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      biography: user?.biography || "",
    });
  }, [user]);

  const { name, email, phoneNumber, biography } = formData;

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: toEnglishDigits(e.target.value),
    });
  };

  const fields = [
    {
      name: "name",
      label: "نام کاربری",
      value: name,
      onChange: formChangeHandler,
    },
    {
      name: "email",
      label: "ایمیل",
      value: email,
      onChange: formChangeHandler,
    },
    {
      name: "phoneNumber",
      label: "شماره موبایل",
      value: phoneNumber,
      onChange: formChangeHandler,
    },
    {
      name: "biography",
      label: "بیوگرافی",
      value: biography,
      onChange: formChangeHandler,
    },
  ];

  const updateUserData = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync(formData);
      queryClient.invalidateQueries({queryKey : ["get-user"]})
      toast.success(data.message);
    }catch(err){
      toast.error(err?.response?.data?.message);
    }
  }

  return (
    <div dir="rtl" className="w-full flex justify-center lg:justify-start">
      <form onSubmit={updateUserData} className="w-[300px] flex gap-y-4 flex-col">
        {fields.map((field) => {
          return (
            <div key={field.name}>
              <Input {...field} value={toPersianDigits(field.value)} />
            </div>
          );
        })}
      <button
        type="submit"
        className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
      >
        {isPending ? (
          <BeatLoader
            color={"#ffffff"}
            loading={isPending}
            size={10}
          />
        ) : (
          "به روز رسانی"
        )}
        </button>

      </form>
    </div>
  );
};

export default Me;
