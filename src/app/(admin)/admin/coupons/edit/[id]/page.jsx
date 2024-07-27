"use client";
import Loading from "@/components/Loading";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useGetProducts from "@/hooks/useGetProducts";
import { useUpdateCoupon } from "@/hooks/useAddCoupon";
import CouponForm from "@/components/CouponForm";
import { useGetOneCoupon } from "@/hooks/useGetCoupons";

const EditCoupon = () => {
  const { id } = useParams();
  const router = useRouter();
  const [type, setType] = useState("percent");
  const [expireDate, setExpireDate] = useState(new Date());
  const [productIds, setProductIds] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    usageLimit: "",
  });
  const { data: selectOptions, isLoading: optionsLoading } = useGetProducts();
  const { products } = selectOptions || {};
  const { isPending, mutateAsync } = useUpdateCoupon();
  const { data, isLoading } = useGetOneCoupon(id);
  const { coupon } = data || {};

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code,
        amount: coupon.amount,
        usageLimit: coupon.usageLimit,
      });
      setProductIds([...coupon.productIds]);
      setType(coupon?.type);
      setExpireDate(coupon.expireDate);
    }
  }, [coupon]);

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: toEnglishDigits(e.target.value),
    });
  };

  const setProductIdsHandler = (e) => {
    const isAll = e.find((p) => p._id === "all");
    if (isAll) {
      setProductIds([{ title: "همه محصولات", _id: "all" }]);
    } else {
      setProductIds(e);
    }
  };

  const updateCoupon = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id: coupon._id,
        editedCoupon: {
          ...formData,
          type,
          productIds: productIds.find((p) => p._id === "all")
            ? products.map((p) => p._id)
            : productIds.map((p) => p._id),
          expireDate: new Date(expireDate).toISOString(),
        },
      });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div dir="rtl" className="w-full flex justify-center lg:justify-start">
      {isLoading && optionsLoading ? (
        <div className="mt-28 w-full flex justify-center items-center">
          <Loading size={15} />
        </div>
      ) : (
        <CouponForm
          onSubmit={updateCoupon}
          title="ویرایش کد تخفیف"
          onChange={formChangeHandler}
          formData={formData}
          type={type}
          setType={setType}
          expireDate={expireDate}
          setExpireDate={setExpireDate}
          setProductIds={setProductIdsHandler}
          products={products}
          isPending={isPending}
          btntext="ویرایش کد تخفیف"
          defaultValue={productIds}
        />
      )}
    </div>
  );
};

export default EditCoupon;
