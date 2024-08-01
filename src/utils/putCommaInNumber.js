import { toPersianDigits } from "./toPersianDigits";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const toPersianNumberWithCommas = (x) => {
  const numWithCommas = numberWithCommas(x);
  const persianNumberWithCommas = toPersianDigits(numWithCommas);
  return persianNumberWithCommas;
};
