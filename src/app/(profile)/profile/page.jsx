"use client"

import Loading from "@/components/Loading";
import { tableHeads } from "@/constants/tableHeads";
import useGetUser from "@/hooks/useAuth";
import { toLoacalDate } from "@/utils/localDate";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { IoWalletOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { LuCalendarClock } from "react-icons/lu";
import { MdArrowRightAlt } from "react-icons/md";

const Profile = () => {

  const {data , isLoading} = useGetUser();
  const {user , cart , payments} = data || {};

  if(user)
  return (
    <article className="w-full flex flex-col gap-y-8">
      {/* welcome */}
      <div className="flex items-center w-full sm:w-2/3 p-3 text--white rounded-md glassmorphism text-xs sm:text-base">سلام {user?.name} ; خوش اومدی 🥰</div>
      {/* info */}
      <div className="flex flex-col gap-y-5">
        <h1 className="text--white text-xl font-bold">سوابق من</h1>
        <div className="grid grid-cols-6 gap-x-8 gap-y-4 sm:gap-y-8">
          <div className="col-span-6 sm:col-span-3 md:col-span-2 glassmorphism rounded-md text-white p-6 flex gap-x-4">
            <div className="rounded-md p-3 text--white text-3xl bg-blue-600">
              <LuCalendarClock/>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-sm">تاریخ پیوستن</p>
              <p className="font-bold text-lg">{toLoacalDate(user?.createdAt)}</p>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 glassmorphism rounded-md text-white p-6 flex gap-x-4">
            <div className="rounded-md p-3 text--white text-3xl bg-blue-600">
              <IoCartOutline/>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-sm">خرید ها</p>
              <p className="font-bold text-lg">{toPersianDigits(user?.Products?.length)}</p>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 glassmorphism rounded-md text-white p-6 flex gap-x-4">
            <div className="rounded-md p-3 text--white text-3xl bg-blue-600">
              <IoWalletOutline/>
            </div>
            <div  className="flex flex-col justify-between">
              <p className="text-sm">سفارش ها</p>
              <p className="font-bold text-lg">{toPersianDigits(payments?.length)}</p>
            </div>
          </div>
        </div>
      </div>
      {/* last payments */}
      <div className="mt-14">
      <div className="w-full flex items-center justify-between">
        <h1 className="text--white text-xl font-bold">آخرین سفارش ها</h1>
        <Link href="/profile/payment" className="text--white flex items-center sm:gap-x-2 text-xs"><MdArrowRightAlt size={20}/> همه سفارش ها</Link>
      </div>
      <div className="shadow-sm overflow-auto my-4">
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
          {payments?.slice(-2)?.map((payment, index) => {
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

      </div>
    </article>
  );
  else return <div className="flex justify-center mt-16">
    <Loading size={15}/>
  </div>
}
 
export default Profile;