"use client";
import Loading from "@/components/Loading";
import { useGetCategoryById } from "@/hooks/useGetCategories";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CategoryForm from "@/components/CategoryForm";
import { useUpdateCategory } from "@/hooks/useAddCategory";

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

const EditCategory = () => {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    englishTitle: "",
    type: "product",
    description: "",
  });

  const { isPending, mutateAsync } = useUpdateCategory();
  const { data, isLoading } = useGetCategoryById(params.id);
  const { category } = data || {};

  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title,
        englishTitle: category.englishTitle,
        type: category.type,
        description: category.description,
      });
    }
  }, [category]);

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: toEnglishDigits(e.target.value),
    });
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id: category._id,
        editedCategory: {
          ...formData,
        },
      });
      toast.success(message);
      router.push("/admin/categories");
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
        <CategoryForm
          onSubmit={updateCategory}
          title="ویرایش دسته بندی"
          fields={fields}
          formChangeHandler={formChangeHandler}
          formData={formData}
          isPending={isPending}
          btnText="ویرایش دسته بندی"
        />
      )}
    </div>
  );
};

export default EditCategory;
