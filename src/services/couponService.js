import http from "./httpServices";

export const addCoupon = (newCoupo) => {
  return http.post("/admin/coupon/add" , newCoupo).then(({data}) => data.data);
}
