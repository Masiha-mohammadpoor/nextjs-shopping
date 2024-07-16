import http from "./httpServices";

export const addToCart = (productId) => {
  return http.post("/cart/add" , {productId}).then(({data}) => data.data);
}
