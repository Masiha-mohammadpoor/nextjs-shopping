"use client";
import Form from "@/components/Form";
import Loading from "@/components/Loading";
import { useAddProduct } from "@/hooks/useAddProduct";
import useGetCategories from "@/hooks/useGetCategories";
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
    name: "description",
    label: "توضیحات",
  },
  {
    name: "slug",
    label: "اسلاگ",
  },
  {
    name: "brand",
    label: "برند",
  },
  {
    name: "price",
    label: "قیمت",
  },
  {
    name: "discount",
    label: "تخفیف (درصد)",
  },
  {
    name: "offPrice",
    label: "قیمت با تخفیف",
  },
  {
    name: "countInStock",
    label: "موجودی",
  },
  {
    name: "imageLink",
    label: "لینک عکس محصول",
  },
];

const AddProduct = () => {
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    brand: "",
    price: "",
    discount: "",
    offPrice: "",
    countInStock: "",
    imageLink: "",
  });

  const { isPending, mutateAsync } = useAddProduct();
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: toEnglishDigits(e.target.value),
    });
  };

  const addNewProduct = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formData,
        category: category._id,
        tags,
      });
      toast.success(message);
      router.push("/admin/products");
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
        <Form
          onSubmit={addNewProduct}
          title="افزودن محصول"
          fields={fields}
          formChangeHandler={formChangeHandler}
          formData={formData}
          category={category}
          setCategory={setCategory}
          categories={categories}
          tags={tags}
          setTags={setTags}
          isPending={isPending}
          btnText="افزودن محصول"
        />
      )}
    </div>
  );
};

export default AddProduct;
