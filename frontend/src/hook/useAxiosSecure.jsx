import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    // Request Interceptor
    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response Interceptor: 401 and 403 logout
    axiosSecure.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const status = error.response?.status;

            // if token is invalid or expired, logout the user
            if (status === 401 || status === 403) {
                await logout();
                navigate("/login");
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
