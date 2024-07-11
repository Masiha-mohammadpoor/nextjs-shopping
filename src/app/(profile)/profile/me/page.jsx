"use client";
import Input from "@/common/Input";
import useGetUser from "@/hooks/useAuth";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useEffect, useState } from "react";

const Me = () => {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

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

  return (
    <div dir="rtl">
      <form className="w-1/3 flex gap-y-4 flex-col">
        {fields.map((field) => {
          console.log(field.value);
          return (
            <div key={field.name}>
              <Input {...field} value={toPersianDigits(field.value)} />
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Me;
