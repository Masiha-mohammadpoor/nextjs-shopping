"use client";
import Loading from "@/components/Loading";
import { couponTableHeads, userTableHeads } from "@/constants/tableHeads";
import { useGetCoupons } from "@/hooks/useGetCoupons";
import useGetProducts from "@/hooks/useGetProducts";
import { toLoacalDate } from "@/utils/localDate";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";

const Coupons = () => {
  const { data, isLoading } = useGetCoupons();
  const { coupons } = data || {};
  const { data: productsData, isLoading: productsLoading } = useGetProducts();
  const { products } = productsData || {};
  return (
    <>
      {isLoading && productsLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Loading size={15} />
        </div>
      ) : (
        <section>
          <h1 className="text--white text-lg font-bold mb-1">
            لیست کد تخفیف ها
          </h1>
          <div className="shadow-sm overflow-auto my-8">
            <table className="text--white border-collapse table-auto w-full min-w-[800px] text-sm">
              <thead>
                <tr>
                  {couponTableHeads.map((item) => {
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
                {coupons?.map((coupon, index) => {
                  return (
                    <tr key={coupon._id}>
                      <td className="table__td font-bold text-lg">
                        {toPersianDigits(index + 1)}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {coupon?.code}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        <div className="badge bg-blue-900 flex justify-center">
                          {coupon?.type === "percent" ? "درصد" : "قیمت ثابت"}
                        </div>
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {coupon.type === "percent"
                          ? `${toPersianDigits(coupon.amount)} %`
                          : `${toPersianNumberWithCommas(coupon.amount)} تومان`}
                      </td>
                      <td className="table__td">
                        <div className="flex flex-col gap-y-2 items-start">
                          {products.length === coupon?.productIds.length ? (
                            <span className="badge bg-blue-700">
                              همه محصولات
                            </span>
                          ) : (
                            coupon?.productIds.map((product, index) => {
                              return (
                                <span className="badge bg-blue-700" key={index}>
                                  {product.title}
                                </span>
                              );
                            })
                          )}
                        </div>
                      </td>
                      <td className="table__td  whitespace-nowrap truncate text-center">
                        {toPersianDigits(coupon?.usageCount)}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        {toPersianDigits(coupon?.usageLimit)}
                      </td>
                      <td className="table__td text-xs text-nowrap">
                        {toLoacalDate(coupon?.expireDate)}
                      </td>
                      <td className="table__td text-xs text-nowrap">
                        {coupon?.isActive ? (
                          <span className="badge badge--success">فعال</span>
                        ) : (
                          <span className="badge badge--error">غیر فعال</span>
                        )}
                      </td>
                      <td className="table__td  whitespace-nowrap truncate">
                        <div className="flex gap-x-2">
                          <button>
                            <Link href={`/admin/coupons/edit/${coupon._id}`}>
                              <BiEdit className="text-lg text-success" />
                            </Link>
                          </button>
                          <button>
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

export default Coupons;
