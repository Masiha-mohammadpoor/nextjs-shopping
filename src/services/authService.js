import http from "./httpServices";

export const getOtp = (phoneNumber) => {
  return http.post("/user/get-otp" , {phoneNumber});
}

export const checkOtp = (data) => {
  return http.post("/user/check-otp" , data);
}

export const completeProfile = (data) => {
  return http.post("/user/complete-profile" , data);
}