import http from "./httpServices";

export const getCategories = () => {
  return http.get("/category/list").then(({data}) => data.data);
}