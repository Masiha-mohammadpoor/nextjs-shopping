import http from "./httpServices";

export const createPayment = () => {
  return http.post("/payment/create").then(({data}) => data.data);
}
