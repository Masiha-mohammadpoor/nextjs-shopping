"use client";
import CategoryForm from "@/components/CategoryForm";
import { useAddCategory } from "@/hooks/useAddCategory";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const fields = [
  {
    name: "title",
    label: "عنوان",
  },
  {
    name: "englishTitle",
    label: "عنوان انگلیسی",
  },
  {
    name: "type",
    label: "نوع",
  },
  {
    name: "description",
    label: "توضیحات",
  },
];

const AddCategory = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    englishTitle: "",
    type: "product",
    description: "",
  });

  const { isPending, mutateAsync } = useAddCategory();

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: toEnglishDigits(e.target.value),
    });
  };

  const addNewCategory = async (e) => {
    e.preventDefault();
    try{
      const {message} = await mutateAsync(formData);
      toast.success(message);
      router.push("/admin/categories");
    }catch(err){
      toast.error(err?.response?.data?.message)
    }
  };

  return (
    <div dir="rtl" className="w-full flex justify-center lg:justify-start">
        <CategoryForm
          onSubmit={addNewCategory}
          title="افزودن دسته بندی"
          fields={fields}
          formChangeHandler={formChangeHandler}
          formData={formData}
          isPending={isPending}
          btnText="افزودن دسته بندی"   
        />
    </div>
  );
};

export default AddCategory;
