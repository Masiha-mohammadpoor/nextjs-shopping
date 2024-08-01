"use client";
import Input from "@/common/Input";
import useGetUser from "@/hooks/useAuth";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { updateUser } from "@/services/authService";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

const Me = () => {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};

  const { isPending, mutateAsync } = useMutation({
    mutationFn: updateUser,
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
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div dir="rtl" className="w-full flex justify-center lg:justify-start">
      {isLoading ? (
        <div className="mt-28 w-full flex justify-center items-center">
          <Loading size={15} />
        </div>
      ) : (
        <form
          onSubmit={updateUserData}
          className="w-[300px] flex gap-y-4 flex-col"
        >
          <div>
            <h1 className="text--white text-lg font-bold mb-1">
              اطلاعات کاربری
            </h1>
            <p className="text-sm text--white">شماره تلفن قابل ویرایش نیست !</p>
          </div>
          {fields.map((field) => {
            return (
              <div key={field.name}>
                <Input
                  disabled={field.name === "phoneNumber" ? true : false}
                  {...field}
                  value={toPersianDigits(field.value)}
                />
              </div>
            );
          })}
          <button
            type="submit"
            className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
          >
            {isPending ? <Loading size={10} /> : "به روز رسانی"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Me;
