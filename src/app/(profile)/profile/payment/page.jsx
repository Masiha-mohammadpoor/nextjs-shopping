"use client";
import Loading from "@/components/Loading";
import { tableHeads } from "@/constants/tableHeads";
import useGetUser from "@/hooks/useAuth";
import { toLoacalDate } from "@/utils/localDate";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";

const Payment = () => {
  const { data, isLoading } = useGetUser();
  const { payments } = data || {};

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center pt-20">
          <Loading size={15} />
        </div>
      ) : (
        <section>
          <h1 className="text--white text-lg font-bold mb-1">سفارشات من</h1>
          {payments.length ? (
            <div className="shadow-sm overflow-auto my-8">
              <table className="text--white border-collapse table-auto w-full min-w-[800px] text-sm">
                <thead>
                  <tr>
                    {tableHeads.map((item) => {
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
                  {payments?.map((payment, index) => {
                    return (
                      <tr key={payment._id}>
                        <td className="table__td font-bold text-lg">
                          {toPersianDigits(index + 1)}
                        </td>
                        <td className="table__td  whitespace-nowrap truncate">
                          {toPersianDigits(payment.invoiceNumber)}
                        </td>
                        <td className="table__td">
                        <div className="flex flex-col gap-y-2 items-start">
                          {payment.cart.productDetail.map((product) => {
                            return (
                              <Link href={`/products/${product.slug}`} key={product._id}>
                              <span
                                className="badge bg-blue-700 flex items-center gap-x-2"
                              >
                                <span>{product.title}</span> <span className="text-red-700 font-bold">x{product.quantity}</span>
                              </span>
                              </Link>
                            );
                          })}
                        </div>
                      </td>
                        <td className="table__td font-bold text-lg">
                          <div className="flex gap-x-1 items-center">
                            {toPersianNumberWithCommas(payment.amount)}
                            <span className="text-xs font-bold">تومان</span>
                          </div>
                        </td>
                        <td className="table__td text-nowrap">
                          {toLoacalDate(payment.createdAt)}
                        </td>
                        <td className="table__td">
                          {payment.status === "COMPLETED" ? (
                            <span className="badge badge--success">موفق</span>
                          ) : (
                            <span className="badge badge-error">ناموفق</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-4">
              <p className="text--white font-bold text-lg mb-4">
                سفارشی وجود ندارد
              </p>
              <Link href="/products" className="text-sky-500">
                رفتن به صفحه محصولات ؟
              </Link>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Payment;
