"use client";
import Loading from "@/components/Loading";
import { productTableHeads } from "@/constants/tableHeads";
import useGetProducts from "@/hooks/useGetProducts";
import useGetUsers from "@/hooks/useGetUsers";
import { toLoacalDate } from "@/utils/localDate";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { FaCircleCheck } from "react-icons/fa6";

const Users = () => {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Loading size={15} />
        </div>
      ) : (
        <section>
          <h1 className="text--white text-lg font-bold mb-1">
            محصولات
          </h1>
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
                        {`${toPersianNumberWithCommas(product?.offPrice)} تومان`}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {toPersianNumberWithCommas(product?.countInStock)}
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

export default Users;
