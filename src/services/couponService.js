import http from "./httpServices";

export const addCoupon = (newCoupo) => {
  return http.post("/admin/coupon/add" , newCoupo).then(({data}) => data.data);
}

export const getAllCoupons = () => {
  return http.get("/admin/coupon/list").then(({data}) => data.data);
}
