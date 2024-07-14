"use client"
import CheckBox from "@/common/CheckBox";
import { useState } from "react";

const CategorySidebar = ({ categories }) => {

  const [selectedCategories , setSelectedCategories] = useState([]);

  const categoryHandler = (e) => {
    if(e.target.checked) setSelectedCategories([...selectedCategories , e.target.value]);
    else {
      const filteredArray = selectedCategories.filter(category => category !== e.target.value);
      setSelectedCategories(filteredArray);
    }
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
