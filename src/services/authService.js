import http from "./httpServices";

export const getOtp = (phoneNumber) => {
  return http
    .post("/user/get-otp", { phoneNumber })
    .then(({ data }) => data.data);
};

export const checkOtp = (data) => {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
};

export const completeProfile = (data) => {
  return http
    .post("/user/complete-profile", data)
    .then(({ data }) => data.data);
};

export const getUserProfile = () => {
  return http.get("/user/profile").then(({ data }) => data.data);
};

export const updateUser = (data) => {
  return http.patch("/user/update", data).then(({ data }) => data.data);
};

export const logoutUser = () => {
  return http.post("/user/logout").then(({ data }) => data.data);
};

// for admin

export const getAllUser = () => {
  return http.get("/admin/user/list").then(({ data }) => data.data);
};
