import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:8000/api/", // TODO: env variable
})

const postJson = (endpoint, data) => {
    return API.post(endpoint, data, {headers: {
        'Content-Type': 'application/json'
    }})
}

const postMultiPart = (endpoint, data) => {
    return API.post(endpoint, data, {headers: {
        'Content-Type': 'multipart/form-data'
    }})
}

// MultiPart calls
export const ProductsAPI = (data) => postMultiPart('products/', data);
export const CategoryAPI = (data) => postMultiPart("categories/", data);
export const OptionsAPI = (data) => postMultiPart("options/", data);

// Json Calls
export const PartAPI = (data) => postJson('parts/', data);
export const CustomPriceAPI = (data) => postJson('custom-prices/', data);
export const ProhibitedCombinationAPI = (data) => postJson('prohibited-combinations/', data)
export const OrderAPI = (data) => postJson("orders/", data)

export default API;