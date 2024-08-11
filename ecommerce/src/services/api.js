import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:8000/api/", // TODO: env variable
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const ProductsAPI = (data) => API.post('products/', data);
export const PartAPI = (data) => API.post('parts/', data);
export const CustomPriceAPI = (data) => API.post('custom-price/', data);
export const CategoryAPI = (data) => API.post("categories/", data);
export const OptionsAPI = (data) => API.post("options/", data);

export default API;