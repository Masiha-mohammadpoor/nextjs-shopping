"use client";
import Loading from "@/components/Loading";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import useGetProducts from "@/hooks/useGetProducts";
import { useAddCoupon } from "@/hooks/useAddCoupon";
import CouponForm from "@/components/CouponForm";

const AddCoupon = () => {
  const router = useRouter();
  const [type, setType] = useState("percent");
  const [expireDate, setExpireDate] = useState(new Date());
  const [productIds, setProductIds] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    usageLimit: "",
  });

  const { isPending, mutateAsync } = useAddCoupon();
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};

  const setProductIdsHandler = (e) => {
    const isAll = e.find((p) => p._id === "all");
    if (isAll) {
      setProductIds([{ title: "همه محصولات", _id: "all" }]);
    } else {
      setProductIds(e);
    }
  };

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: toEnglishDigits(e.target.value),
    });
  };

  const addCoupon = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formData,
        type,
        productIds: productIds.find((p) => p._id === "all")
          ? products.map((p) => p._id)
          : productIds.map((p) => p._id),
        expireDate: new Date(expireDate).toISOString(),
      });
      toast.success(message);
      router.push("/admin/coupons");
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
        <CouponForm
          onSubmit={addCoupon}
          title="افزودن کد تخفیف"
          onChange={formChangeHandler}
          formData={formData}
          type={type}
          setType={setType}
          expireDate={expireDate}
          setExpireDate={setExpireDate}
          setProductIds={setProductIdsHandler}
          products={products}
          isPending={isPending}
          btntext="افزودن کد تخفیف"
          defaultValue={productIds}
        />
      )}
    </div>
  );
};

export default AddCoupon;
