import http from "./httpServices";

export const getProducts = () => {
  return http.get("/product/list").then(({data}) => data.data);
}