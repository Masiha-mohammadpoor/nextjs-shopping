"use client";

import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";

const Price = ({discount , price , offPrice}) => {
  return (
    <div className="flex items-end flex-col">
    <div>
      {discount !== 0 && (
        <div className="w-24 px-1 flex items-center justify-between">
          <p className="line-through text--white text-xs">
            {toPersianNumberWithCommas(price)}
          </p>
          <span className="inline-block badge--error">
            {toPersianDigits(discount)}%
          </span>
        </div>
      )}
    </div>
    <p className="text--white flex items-end gap-x-0.5 text-sm font-bold">
      {toPersianNumberWithCommas(offPrice)}
      <span className="text-xs font-bold">تومان</span>
    </p>
  </div>
  );
}
 
export default Price;