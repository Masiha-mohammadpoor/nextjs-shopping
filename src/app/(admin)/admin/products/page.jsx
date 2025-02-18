"use client";
import Loading from "@/components/Loading";
import { productTableHeads } from "@/constants/tableHeads";
import { useRemoveProduct } from "@/hooks/useAddProduct";
import useGetProducts from "@/hooks/useGetProducts";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const Products = () => {
  const { mutateAsync } = useRemoveProduct();
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};
  const queryClient = useQueryClient();

  const removeProductHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Loading size={15} />
        </div>
      ) : (
        <section>
          <div className="w-full flex items-center justify-between">
            <h1 className="text--white text-lg font-bold mb-1">محصولات</h1>
            <Link
              href="/admin/products/add"
              className="flex items-center gap-x-1 text--white text-sm sm:text-base"
            >
              <FaCirclePlus /> افزودن محصول
            </Link>
          </div>
          <div className="shadow-sm overflow-auto my-8">
            <table className="text--white border-collapse table-auto w-full min-w-[800px] text-sm">
              <thead>
                <tr>
                  {productTableHeads.map((item) => {
                    return (
                      <th
                        className="whitespace-nowrap table__th text-center"
                        key={item.id}
                      >
                        {item.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => {
                  return (
                    <tr key={product._id}>
                      <td className="table__td font-bold text-lg">
                        {toPersianDigits(index + 1)}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {product?.title}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {product?.category?.title}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {`${toPersianNumberWithCommas(product?.price)} تومان`}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate text-error font-bold text-lg">
                        {`% ${toPersianNumberWithCommas(product?.discount)} -`}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {`${toPersianNumberWithCommas(
                          product?.offPrice
                        )} تومان`}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate text-center">
                        {toPersianNumberWithCommas(product?.countInStock)}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        <div className="flex gap-x-2">
                          <button>
                            <Link href={`/admin/products/edit/${product._id}`}>
                              <BiEdit className="text-lg text-success" />
                            </Link>
                          </button>
                          <button
                            onClick={() => removeProductHandler(product._id)}
                          >
                            <FaTrashAlt className="text-lg text-error" />
                          </button>
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

export default Products;
