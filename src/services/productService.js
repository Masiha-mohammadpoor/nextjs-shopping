import http from "./httpServices";

export const getProducts = (qs = "") => {
  return http.get(`/product/list?${qs}`).then(({data}) => data.data);
}

export const getSingleProduct = (slug) => {
  return http.get(`/product/slug/${slug}`).then(({data}) => data.data);
}