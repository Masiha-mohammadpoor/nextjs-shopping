"use client";
import Radio from "@/common/Radio";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";

const sortOptions = [
  {
    id: 1,
    value: "latest",
    label: "جدید ترین",
  },
  {
    id: 2,
    value: "earliest",
    label: "قدیمی ترین",
  },
  {
    id: 3,
    value: "popular",
    label: "محبوب ترین",
  },
];

const ProductSort = () => {
  const [sortProducts, setSortProducts] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSortProducts(searchParams.get("sort") || "");
  }, [searchParams]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const sortHandler = (e) => {
    const value = e.target.value;
    setSortProducts(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  return (
    <div>
      <p className="flex items-center gap-x-3 mb-3 text--white font-bold">
        <FaSortAmountDown size={20} />
        مرتب سازی
      </p>
      <ul>
        {sortOptions.map((sort) => {
          return (
            <li className="text--white" key={sort.id}>
              <Radio
                id={sort.id}
                name="product-sort"
                label={sort.label}
                value={sort.value}
                onChange={sortHandler}
                checked={sortProducts === sort.value}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductSort;
