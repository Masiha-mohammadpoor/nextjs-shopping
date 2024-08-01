"use client";
import Input from "@/common/Input";
import Radio from "@/common/Radio";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import Loading from "./Loading";
import { toPersianDigits } from "@/utils/toPersianDigits";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { SelectStyles } from "@/constants/SelectStyles";

const CouponForm = ({
  onSubmit,
  title,
  onChange,
  formData,
  type,
  setType,
  expireDate,
  setExpireDate,
  setProductIds,
  products,
  isPending,
  btntext,
  defaultValue,
}) => {
  return (
    <form onSubmit={onSubmit} className="w-[300px] flex gap-y-4 flex-col">
      <h1 className="text--white text-lg font-bold mb-1">{title}</h1>
      <div>
        <Input
          label="کد"
          name="code"
          onChange={onChange}
          value={toPersianDigits(formData.code)}
          disabled={false}
        />
      </div>
      <div>
        <Input
          label={`مقدار (${type === "percent" ? "درصد" : "تومان"})`}
          name="amount"
          onChange={onChange}
          value={toPersianDigits(formData.amount)}
          disabled={false}
        />
      </div>
      <div>
        <Input
          label="ظرفیت"
          name="usageLimit"
          onChange={onChange}
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
          calendarPosition="top"
          fixMainPosition="bottom"
        />
      </div>
      {/* Select */}
      <div>
        <p className="inline-block text-white mb-3 text-sm">دسته بندی</p>
        <Select
          menuPlacement="auto"
          isMulti
          onChange={setProductIds}
          options={[{ title: "همه محصولات", _id: "all" }, ...products]}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          styles={SelectStyles}
          value={defaultValue}
        />
      </div>
      <button
        type="submit"
        className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
      >
        {isPending ? <Loading size={10} /> : btntext}
      </button>
    </form>
  );
};

export default CouponForm;
