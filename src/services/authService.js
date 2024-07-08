import http from "./httpServices";

export const getOtp = (phoneNumber) => {
  return http.post("/user/get-otp" , {phoneNumber});
}