"use client";
import { tableHeads } from "@/constants/tableHeads";
import useGetUser from "@/hooks/useAuth";
import { toLoacalDate } from "@/utils/localDate";

const Payment = () => {

  const {data , isLoading} = useGetUser();
  const {payments} = data || {};
  console.log(payments)

  
  return (
    <section>
      <table className="w-full">
        <thead>
          <tr>
            {tableHeads.map(h => {
              return <th key={h.id}>{h.label}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {payments?.map((p , index)=> {
            return <tr key={p._id}>
              <td>{index}</td>
              <td>{p.invoiceNumber}</td>
              <td>{p.description}</td>
              <td>{p.cart.productDetail.map(product => {
                return <span key={product._id}>{product.title} </span>
              })}</td>
              <td>{p.amout}</td>
              <td>{toLoacalDate(p.createdAt)}</td>
              <td>{p.status === "COMPLETED" ? "موفق" : "ناموفق"}</td>
            </tr>
          })}
        </tbody>
      </table>
    </section>
  );
}
 
export default Payment;