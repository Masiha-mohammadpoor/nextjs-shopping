"use client";
import Loading from "@/components/Loading";
import { paymentTableHeads } from "@/constants/tableHeads";
import { useGetPayments } from "@/hooks/useGetPayments";
import { toLoacalDate } from "@/utils/localDate";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";

const Payments = () => {
  const { data, isLoading } = useGetPayments();
  const {payments} = data || {};
  console.log(payments)

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Loading size={15} />
        </div>
      ) : (
        <section>
          <h1 className="text--white text-lg font-bold mb-1">سفارشات</h1>
          <div className="shadow-sm overflow-auto my-8">
            <table className="text--white border-collapse table-auto w-full min-w-[800px] text-sm">
              <thead>
                <tr>
                  {paymentTableHeads.map((item) => {
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
                      <td className="table__td  whitespace-nowrap truncate">
                        <div>
                          <p>{payment.user.name}</p>
                          <p>{toPersianDigits(payment.user.phoneNumber)}</p>
                          <p>{payment.user.email}</p>
                        </div>
                      </td>
                      <td className="table__td">
                        <div className="flex flex-col gap-y-2 items-start">
                          {payment.cart.productDetail.map((product) => {
                            return (
                              <span
                                className="badge bg-blue-700 flex items-center gap-x-2"
                                key={product._id}
                              >
                                <span>{product.title}</span> <span className="text-red-700 font-bold">x{product.quantity}</span>
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="table__td font-bold text-lg">
                        {toPersianNumberWithCommas(payment.amount)}
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
        </section>
      )}
    </>
  );
};

export default Payments;
