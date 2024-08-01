"use client";

import Loading from "@/components/Loading";
import { paymentTableHeads } from "@/constants/tableHeads";
import { useGetPayments } from "@/hooks/useGetPayments";
import useGetProducts from "@/hooks/useGetProducts";
import useGetUsers from "@/hooks/useGetUsers";
import { toLoacalDate } from "@/utils/localDate";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { IoWalletOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { AiOutlineProduct } from "react-icons/ai";

const Profile = () => {
  const { data: usersData } = useGetUsers();
  const { users } = usersData || {};
  const { data: paymentsData } = useGetPayments();
  const { payments } = paymentsData || {};
  const { data: productsData } = useGetProducts();
  const { products } = productsData || {};

  if (users && payments && products)
    return (
      <article>
        <div className="flex flex-col overflow-hidden">
          {/* welcome */}
          <div className="flex items-center mb-14 w-full sm:w-2/3 p-3 text--white rounded-md glassmorphism text-xs sm:text-base">
            سلام ادمین ; خوش اومدی 🥰
          </div>
          {/* info */}
          <div className="flex flex-col gap-y-5 mb-14">
            <h1 className="text--white text-xl font-bold">سوابق فروشگاه</h1>
            <div className="grid grid-cols-6 gap-x-8 gap-y-4 sm:gap-y-8">
              <div className="col-span-6 sm:col-span-3 md:col-span-2 glassmorphism rounded-md text-white p-6 flex gap-x-4">
                <div className="rounded-md p-3 text--white text-3xl bg-blue-600">
                  <LuUsers />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-sm">کاربران</p>
                  <p className="font-bold text-base">
                    {toPersianDigits(users?.length)}
                  </p>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3 md:col-span-2 glassmorphism rounded-md text-white p-6 flex gap-x-4">
                <div className="rounded-md p-3 text--white text-3xl bg-blue-600">
                  <AiOutlineProduct />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-sm">محصولات</p>
                  <p className="font-bold text-base">
                    {toPersianDigits(products?.length)}
                  </p>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3 md:col-span-2 glassmorphism rounded-md text-white p-6 flex gap-x-4">
                <div className="rounded-md p-3 text--white text-3xl bg-blue-600">
                  <IoWalletOutline />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-sm">سفارش ها</p>
                  <p className="font-bold text-base">
                    {toPersianDigits(payments?.length)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* last payments */}
          <div>
            <div className="w-full flex items-center justify-between">
              <h1 className="text--white text-xl font-bold">آخرین سفارش ها</h1>
              <Link
                href="/admin/payments"
                className="text--white flex items-center sm:gap-x-2 text-xs"
              >
                <MdArrowRightAlt size={20} /> همه سفارش ها
              </Link>
            </div>
            {payments?.length ? (
              <div className="shadow-sm overflow-auto my-4">
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
                    {payments?.slice(-2)?.map((payment, index) => {
                      return (
                        <tr key={payment._id}>
                          <td className="table__td font-bold text-lg">
                            {toPersianDigits(index + 1)}
                          </td>
                          <td className="table__td  whitespace-nowrap truncate">
                            {toPersianDigits(payment?.invoiceNumber)}
                          </td>
                          <td className="table__td  whitespace-nowrap truncate">
                            {payment?.user && <div>
                              <p>{payment.user.name}</p>
                              <p>
                                {toPersianDigits(payment?.user?.phoneNumber)}
                              </p>
                              <p>{payment.user.email}</p>
                            </div>}
                          </td>
                          <td className="table__td">
                            <div className="flex flex-col gap-y-2 items-start">
                              {payment.cart.productDetail.map((product) => {
                                console.log(product.quantity);
                                // purchases += product.quantity;
                                return (
                                  <span
                                    className="badge bg-blue-700 flex items-center gap-x-2"
                                    key={product._id}
                                  >
                                    <span>{product.title}</span>{" "}
                                    <span className="text-red-700 font-bold">
                                      x{product.quantity}
                                    </span>
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
          </div>
        </div>
      </article>
    );
  else
    return (
      <div className="flex justify-center mt-16">
        <Loading size={15} />
      </div>
    );
};

export default Profile;
