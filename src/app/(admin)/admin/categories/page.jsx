"use client";
import Loading from "@/components/Loading";
import { categoryTableHeads } from "@/constants/tableHeads";
import { useRemoveCategories } from "@/hooks/useAddCategory";
import useGetCategories from "@/hooks/useGetCategories";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";


const Categories = () => {
  const {mutateAsync} = useRemoveCategories();
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};
  const queryClient = useQueryClient()


  const removeCategoryHandler = async (id) => {
    try {
      const {message} = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({queryKey : ["get-categories"]});
    }catch(err){
      toast.error(err?.response?.data?.message);
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Loading size={15} />
        </div>
      ) : (
        <section>
          <h1 className="text--white text-lg font-bold mb-1">
            دسته بندی ها
          </h1>
          <div className="shadow-sm overflow-auto my-8">
            <table className="text--white border-collapse table-auto w-full min-w-[800px] text-sm">
              <thead>
                <tr>
                  {categoryTableHeads.map((item) => {
                    return (
                      <th
                        className="whitespace-nowrap table__th"
                        key={item.id}
                      >
                        {item.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {categories?.map((category, index) => {
                  return (
                    <tr key={category._id}>
                      <td className="table__td font-bold text-lg">
                        {toPersianDigits(index + 1)}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {category?.title}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {category?.description}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {category?.englishTitle}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {category?.type}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        <div className="flex gap-x-2">
                          <button><Link href={`/admin/categories/edit/${category._id}`}><BiEdit className="text-lg text-success"/></Link></button>
                          <button onClick={() => removeCategoryHandler(category._id)}><FaTrashAlt className="text-lg text-error"/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default Categories;
