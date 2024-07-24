"use client";
import Loading from "@/components/Loading";
import { userTableHeads } from "@/constants/tableHeads";
import useGetUsers from "@/hooks/useGetUsers";
import { toLoacalDate } from "@/utils/localDate";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { FaCircleCheck } from "react-icons/fa6";

const Users = () => {

  const {data , isLoading} = useGetUsers();
  const {users} = data || {};

  
  return (
    <>
    {isLoading ? 
      <div className="flex justify-center items-center mt-20">
        <Loading size={15}/>
      </div>
    :
    <section>
      <h1 className="text--white text-lg font-bold mb-1">اطلاعات کاربران</h1>
      <div className="shadow-sm overflow-auto my-8">
      <table className="text--white border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {userTableHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th text-center" key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
              <tr key={user._id}>
                <td className="table__td font-bold text-lg">{toPersianDigits(index + 1)}</td>
                <td className="table__td  whitespace-nowrap truncate">
                  {user?.name}
                </td>
                <td className="table__td  whitespace-nowrap truncate">
                  {user?.email}
                </td>
                <td className="table__td  whitespace-nowrap truncate">
                  <span className="flex items-center gap-x-2">
                  <span>{toPersianDigits(user?.phoneNumber)}</span>
                  <FaCircleCheck className="text-success"/>
                  </span>
                </td>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2 items-start">
                    {user.Products.map((product , index) => {
                      return (
                        <span
                          className="badge bg-blue-700"
                          key={index}
                        >
                          {product.title}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td">
                  {toLoacalDate(user.createdAt)}
                </td>
                {/* <td className="table__td text-nowrap">
                  {toLoacalDate(payment.createdAt)}
                </td>
                <td className="table__td">
                  {payment.status === "COMPLETED" ? (
                    <span className="badge badge--success">موفق</span>
                  ) : (
                    <span className="badge badge-error">ناموفق</span>
                  )}
                </td> */}
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
 
export default Users;