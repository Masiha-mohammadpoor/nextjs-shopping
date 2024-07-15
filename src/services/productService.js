import http from "./httpServices";

export const getProducts = (qs) => {
  return http.get(`/product/list?${qs}`).then(({data}) => data.data);
}