import http from "./httpServices";

export const getOtp = (phoneNumber) => {
  return http.post("/user/get-otp" , {phoneNumber});
}

export const checkOtp = ({phoneNumber , otp}) => {
  return http.post("/user/check-otp" , {phoneNumber , otp})
}