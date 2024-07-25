"use client";
import Input from "@/common/Input";
import SelectOption from "@/common/Select";
import Loading from "@/components/Loading";
import { useUpdateProduct } from "@/hooks/useAddProduct";
import useGetCategories from "@/hooks/useGetCategories";
import { useGetProductById } from "@/hooks/useGetProducts";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TagsInput } from "react-tag-input-component";


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


const EditProduct = () => {

  const params = useParams();
  const router = useRouter();
  const {isPending , mutateAsync} = useUpdateProduct()
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

  const {data : editdProduct, isLoading : productLoading} = useGetProductById(params.id);
  const {product} = editdProduct || {};
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};

  useEffect(() => {
    if(product){
      setFormData({
        title: product.title,
        description: product.description,
        slug: product.slug,
        brand: product.brand,
        price: product.price,
        discount: product.discount || 0,
        offPrice: product.offPrice,
        countInStock: product.countInStock,
        imageLink: product.imageLink,  
      })
      setTags(product.tags);
      setCategory(product.category)
    }
  } , [product])

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: toEnglishDigits(e.target.value),
    });
  };


  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const {message} = await mutateAsync({id : product._id , editedProduct : {
        ...formData,
        category : category._id,
        tags
      }})
      toast.success(message);
      router.push("/admin/products")
    }catch(err){
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div dir="rtl" className="w-full flex justify-center lg:justify-start">
      {isLoading && productLoading ? (
        <div className="mt-28 w-full flex justify-center items-center">
          <Loading size={15} />
        </div>
      ) : (
        <form
          onSubmit={updateProduct}
          className="w-[300px] flex gap-y-4 flex-col"
        >
          <h1 className="text--white text-lg font-bold mb-1">ویرایش محصول</h1>
          {fields.map((field) => {
            return (
              <div key={field.name}>
                <Input
                  label={field.label}
                  name={field.name}
                  onChange={formChangeHandler}
                  value={toPersianDigits(formData[field.name])}
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
              value={category}
              onChange={setCategory}
              options={categories}
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
            {isPending ? <Loading size={10} /> : "ویرایش محصول"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
