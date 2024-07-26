"use client";
import Loading from "@/components/Loading";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "@/common/Input";
import Select from "react-select";
import Radio from "@/common/Radio";
import useGetProducts from "@/hooks/useGetProducts";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { SelectStyles } from "@/constants/SelectStyles";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useAddCoupon } from "@/hooks/useAddCoupon";

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

  const {isPending , mutateAsync} = useAddCoupon()
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};

  const formChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: toEnglishDigits(e.target.value),
    });
  };

  const addCoupon = async (e) => {
    e.preventDefault();
    try{
      const {message} = await mutateAsync({
        ...formData,
        type,
        productIds : productIds.map(p => p._id),
        expireDate : new Date(expireDate).toISOString()
      });
      toast.success(message);
      router.push("/admin/coupons");
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
        <form onSubmit={addCoupon} className="w-[300px] flex gap-y-4 flex-col">
          <h1 className="text--white text-lg font-bold mb-1">
            افزودن کد تخفیف
          </h1>
          <div>
            <Input
              label="کد"
              name="code"
              onChange={formChangeHandler}
              value={toPersianDigits(formData.code)}
              disabled={false}
            />
          </div>
          <div>
            <Input
              label="مقدار"
              name="amount"
              onChange={formChangeHandler}
              value={toPersianDigits(formData.amount)}
              disabled={false}
            />
          </div>
          <div>
            <Input
              label="ظرفیت"
              name="usageLimit"
              onChange={formChangeHandler}
              value={toPersianDigits(formData.usageLimit)}
              disabled={false}
            />
          </div>
          <div>
            <p className="inline-block text-white mb-3 text-sm">نوع</p>
            <div className="w-full flex items-center justify-between">
              <Radio
                checked={type === "percent"}
                id="percent-type"
                label="درصد"
                name="type"
                value="percent"
                onChange={(e) => setType(e.target.value)}
              />
              <Radio
                checked={type === "fixedProduct"}
                id="fixedProduct-type"
                label="قیمت ثابت"
                name="type"
                value="fixedProduct"
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          </div>
          {/* calendar */}
          <div className="textField__input">
            <DatePicker
              inputClass="bg-transparent border-none outline-none"
              value={expireDate}
              onChange={setExpireDate}
              format="YYYY/MM/DD"
              calendar={persian}
              locale={persian_fa}
            />
          </div>
          {/* Select */}
          <div>
            <p className="inline-block text-white mb-3 text-sm">دسته بندی</p>
            <Select
              menuPlacement="auto"
              isMulti
              onChange={setProductIds}
              options={products}
              getOptionLabel={(option) => option.title}
              getOptionValue={(option) => option._id}
              styles={SelectStyles}
            />
          </div>
          <button
            type="submit"
            className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
          >
            {isPending ? <Loading size={10} /> : "افزودن کد تخفیف"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddCoupon;
