import http from "./httpServices";

export const getProducts = (qs = "" , cookies) => {
  return http.get(`/product/list?${qs}` , {
    headers : {
      Cookie : cookies
    }
  }).then(({data}) => data.data);
}

export const getSingleProduct = (slug) => {
  return http.get(`/product/slug/${slug}`).then(({data}) => data.data);
}

export const likeProduct = (id) => {
  return http.post(`/product/like/${id}`).then(({data}) => data.data);
}
