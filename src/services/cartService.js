import http from "./httpServices";

export const addToCart = (productId) => {
  return http.post("/cart/add", { productId }).then(({ data }) => data.data);
};

export const decrementFromCart = (productId) => {
  return http.post("/cart/remove", { productId }).then(({ data }) => data.data);
};

export const addCouponToCart = (couponCode) => {
  return http
    .post("/cart/coupon", { couponCode })
    .then(({ data }) => data.data);
};
