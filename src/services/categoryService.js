import http from "./httpServices";

export const getCategories = () => {
  return http.get("/category/list").then(({data}) => data.data);
}

// for admin

export const addCategory = (category) => {
  return http.post("/admin/category/add" , category).then(({data}) => data.data);
}
