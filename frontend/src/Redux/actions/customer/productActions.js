import {CUSTOMER_GET_PRODUCTS} from "../../constants/action-types";
import axios from "axios";
const { backendURL } = require("../../../config");

const ROOT_URL = backendURL +"/customer/product";

export const getProducts = (productData, page, limit, Name, Categories) => dispatch => {
    axios.defaults.withCredentials = true;
    // console.log(" Inside getProducts :");
    // console.log(" page :", page);
    // console.log(" limit :", limit);
    if(!Name){
        Name = ""
    }
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    if (!page) {
        page = 1;
    }
    if (!limit) {
        limit = 8;
    }
    if (productData) {
        if (page > productData.totalPages) {
            page = 1
        }
    }
    const data = {
        page: page,
        limit: limit,
        name: Name,
        Categories: Categories,
    }
    console.log("data", JSON.stringify(data));
    // axios.get(`${backendURL}/customer/product/products?page=${page}&limit=${limit}&sellerId=${sellerId}`, config)
    axios.post(`${ROOT_URL}/products`, data, config)
        .then(response => {
            // console.log("All Student", JSON.stringify(response));
            let data = { ...response.data }
                data.name = Name;
                data.categories = Categories 

            if (response.status == 200) {
                dispatch({
                    type: CUSTOMER_GET_PRODUCTS,
                    payload: data,
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
            })
}