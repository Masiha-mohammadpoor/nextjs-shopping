"use client";
import Input from "@/common/Input";
import SelectOption from "@/common/Select";
import Loading from "@/components/Loading";
import { useAddProduct } from "@/hooks/useAddProduct";
import useGetCategories from "@/hooks/useGetCategories";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { TagsInput } from "react-tag-input-component";

const AddProduct = () => {

  const router = useRouter();
  const [category, setCategory] = useState({label : "" , value : ""});
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
  let options = [];
  categories && categories.map(c => options = [...options , {label : c.title , value : c._id}]);

  const {
    title,
    description,
    slug,
    brand,
    price,
    discount,
    offPrice,
    countInStock,
    imageLink,
  } = formData;

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: toEnglishDigits(e.target.value),
    });
  };

  const fields = [
    {
      name: "title",
      label: "عنوان",
      value: title,
      onChange: formChangeHandler,
    },
    {
      name: "description",
      label: "توضیحات",
      value: description,
      onChange: formChangeHandler,
    },
    {
      name: "slug",
      label: "اسلاگ",
      value: slug,
      onChange: formChangeHandler,
    },
    {
      name: "brand",
      label: "برند",
      value: brand,
      onChange: formChangeHandler,
    },
    {
      name: "price",
      label: "قیمت",
      value: price,
      onChange: formChangeHandler,
    },
    {
      name: "discount",
      label: "تخفیف (درصد)",
      value: discount,
      onChange: formChangeHandler,
    },
    {
      name: "offPrice",
      label: "قیمت با تخفیف",
      value: offPrice,
      onChange: formChangeHandler,
    },
    {
      name: "countInStock",
      label: "موجودی",
      value: countInStock,
      onChange: formChangeHandler,
    },
    {
      name: "imageLink",
      label: "لینک عکس محصول",
      value: imageLink,
      onChange: formChangeHandler,
    },
  ];

  const addNewProduct = async (e) => {
    e.preventDefault();
    try {
      const {message} = await mutateAsync({...formData , category : category.value , tags})
      toast.success(message);
      router.push("/admin/products");
    }catch(err){
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
          onSubmit={addNewProduct}
          className="w-[300px] flex gap-y-4 flex-col"
        >
          <h1 className="text--white text-lg font-bold mb-1">افزودن محصول</h1>
          {fields.map((field) => {
            return (
              <div key={field.name}>
                <Input
                  {...field}
                  value={toPersianDigits(field.value)}
                  disabled={false}
                />
              </div>
            );
          })}
          {/* tags input */}
          <div>
            <label className="inline-block text-white mb-3 text-sm">
              دسته بندی
            </label>
            <SelectOption
              defaultValue={category}
              onChnage={setCategory}
              options={options}
              // label="title"
              // value="_id"
            />
          </div>
          {/* react select */}
          <div>
            <label className="inline-block text-white mb-3 text-sm">
              تگ ها
            </label>
            <TagsInput
              value={tags}
              onChange={setTags}
              name="tags"
              classNames={{
                input: "bg-transparent focus:border-none text--white",
                tag: "text--white",
              }}
            />
          </div>
          <button
            type="submit"
            className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
          >
            {isPending ? <Loading size={10} /> : "افزودن محصول"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
