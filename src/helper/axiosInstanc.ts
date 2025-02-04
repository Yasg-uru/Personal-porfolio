import axios from "axios";

const axiosInstance =axios.create({
    baseURL:'https://yash-choudhary-portfolio-backend.onrender.com',
    // baseURL:'http://localhost:8001',
    
})
export default axiosInstance;
