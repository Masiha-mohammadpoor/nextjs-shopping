"use client";
import CheckBox from "@/common/CheckBox";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const CategorySidebar = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category").split(",") || []
  );

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const categoryHandler = (e) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, e.target.value]);
      router.push(
        pathname +
          "?" +
          createQueryString("category", [...selectedCategories, e.target.value])
      );
    } else { 

        const filteredArray = selectedCategories.filter(
          (category) => category !== e.target.value
        );
        setSelectedCategories(filteredArray);
        router.push(
          pathname + "?" + createQueryString("category", filteredArray)
        );
  };
}

  return (
    <article className="col-span-1">
      <div className="glassmorphism">
        <p className="text--white font-bold">دسته بندی ها</p>
        <ul>
          {categories.map((category) => {
            return (
              <li className="text--white" key={category._id}>
                <CheckBox
                  id={category._id}
                  name="product-type"
                  label={category.title}
                  value={category.englishTitle}
                  onChange={categoryHandler}
                  checked={selectedCategories.includes(category.englishTitle)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};

export default CategorySidebar;
