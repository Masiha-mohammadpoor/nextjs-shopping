import http from "./httpServices";

export const addCoupon = (newCoupo) => {
  return http.post("/admin/coupon/add" , newCoupo).then(({data}) => data.data);
}

export const getAllCoupons = () => {
  return http.get("/admin/coupon/list").then(({data}) => data.data);
}

export const getOneCoupon = (id) => {
  return http.get(`/admin/coupon/${id}`).then(({data}) => data.data);
}

export const updateCoupon = ({id , editedCoupon}) => {
  return http.patch(`/admin/coupon/update/${id}` , editedCoupon).then(({data}) => data.data);
}

export const removeCoupon = (id) => {
  return http.delete(`/admin/coupon/remove/${id}`).then(({data}) => data.data);
}


