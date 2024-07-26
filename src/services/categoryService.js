import http from "./httpServices";

export const getCategories = () => {
  return http.get("/category/list").then(({data}) => data.data);
}

// for admin

export const addCategory = (category) => {
  return http.post("/admin/category/add" , category).then(({data}) => data.data);
}


export const getCategoryById = (id) => {
  return http.get(`/category/${id}`).then(({data}) => data.data);
}

export const updateCategory = ({id , editedCategory}) => {
  return http.patch(`/admin/category/update/${id}` , editedCategory).then(({data}) => data.data);
}

export const removeCategory = (id) => {
  return http.delete(`/admin/category/remove/${id}`).then(({data}) => data.data);
}
