import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`,
    withCredentials: true
})

export default axiosInstance