"use client";
import Loading from "@/components/Loading";
import { tableHeads } from "@/constants/tableHeads";
import useGetUser from "@/hooks/useAuth";
import { toLoacalDate } from "@/utils/localDate";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";

const Payment = () => {

  const {data , isLoading} = useGetUser();
  const {payments} = data || {};
  console.log(payments)

  
  return (
    <>
    {isLoading ? 
      <div className="flex justify-center items-center mt-20">
        <Loading size={15}/>
      </div>
    :
    <section>
      <div className="shadow-sm overflow-auto my-8">
      <table className="text--white border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {tableHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th text-center" key={item.id}>
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
                <td className="table__td font-bold text-lg">{toPersianDigits(index + 1)}</td>
                <td className="table__td  whitespace-nowrap truncate">
                  {toPersianDigits(payment.invoiceNumber)}
                </td>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2 items-start">
                    {payment.cart.productDetail.map((product) => {
                      return (
                        <span
                          className="badge bg-blue-700"
                          key={product._id}
                        >
                          {product.title}
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
    }
    </>
  );
}
 
export default Payment;