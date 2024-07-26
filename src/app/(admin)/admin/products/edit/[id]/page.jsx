"use client";
import Form from "@/components/Form";
import Loading from "@/components/Loading";
import { useUpdateProduct } from "@/hooks/useAddProduct";
import useGetCategories from "@/hooks/useGetCategories";
import { useGetProductById } from "@/hooks/useGetProducts";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const EditProduct = () => {
  const params = useParams();
  const router = useRouter();
  const { isPending, mutateAsync } = useUpdateProduct();
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

  const { data: editdProduct, isLoading: productLoading } = useGetProductById(
    params.id
  );
  const { product } = editdProduct || {};
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};

  useEffect(() => {
    if (product) {
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
      });
      setTags(product.tags);
      setCategory(product.category);
    }
  }, [product]);

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: toEnglishDigits(e.target.value),
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id: product._id,
        editedProduct: {
          ...formData,
          category: category._id,
          tags,
        },
      });
      toast.success(message);
      router.push("/admin/products");
    } catch (err) {
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
        <Form
          onSubmit={updateProduct}
          title="ویرایش محصول"
          fields={fields}
          formChangeHandler={formChangeHandler}
          formData={formData}
          category={category}
          setCategory={setCategory}
          categories={categories}
          tags={tags}
          setTags={setTags}
          isPending={isPending}
          btnText="ویرایش محصول"
        />
      )}
    </div>
  );
};

export default EditProduct;
