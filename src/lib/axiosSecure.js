import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // তোমার ব্যাকএন্ড সার্ভারের ইউআরএল
  withCredentials: true,
});

export default axiosSecure;