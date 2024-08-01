import http from "./httpServices";

export const getProducts = (qs = "", cookies) => {
  return http
    .get(`/product/list?${qs}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
};

export const getSingleProduct = (slug) => {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
};

export const likeProduct = (id) => {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
};

// for admin

export const addProduct = (product) => {
  return http.post("/admin/product/add", product).then(({ data }) => data.data);
};

export const getProductById = (id) => {
  return http.get(`/product/${id}`).then(({ data }) => data.data);
};

export const updateProduct = ({ id, editedProduct }) => {
  return http
    .patch(`/admin/product/update/${id}`, editedProduct)
    .then(({ data }) => data.data);
};

export const removeProduct = (id) => {
  return http
    .delete(`/admin/product/remove/${id}`)
    .then(({ data }) => data.data);
};
