import { SELLER_ADD_PRODUCT, SELLER_GET_PRODUCTS, SELLER_UPDATE_PRODUCT } from "../../constants/action-types";
import axios from "axios";
const { backendURL } = require("../../../config");

const ROOT_URL = backendURL + "/seller/product";

export const getProducts = (productData, SellerId, page, limit, Name, Categories) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside getProducts :");
    console.log(" page :", page);
    console.log(" limit :", limit);
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
        SellerId: SellerId, 
        name: Name,
        Categories: Categories,
    }
    console.log("data", JSON.stringify(data));
    // axios.get(`${backendURL}/customer/product/products?page=${page}&limit=${limit}&sellerId=${sellerId}`, config)
    axios.post(`${backendURL}/customer/product/products`, data, config)
        .then(response => {
            // console.log("All Student", JSON.stringify(response));
            let data = { ...response.data }
                data.name = Name;
                data.categories = Categories 

            if (response.status == 200) {
                dispatch({
                    type: SELLER_GET_PRODUCTS,
                    payload: data,
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
            })
}

export const addProduct = (product, productImages) => dispatch => {



    console.log("Images: ", JSON.stringify(productImages));

    const formData = new FormData();
    formData.append('Product', JSON.stringify(product));
    formData.append('Name', product.Name);
    formData.append('SellerName', product.SellerName);
    for (const key in productImages) {
        formData.append('Images', productImages[key]);
    }


    // const token = localStorage.getItem("token");
    const config = {
        headers: {
            // Authorization: "Bearer " + token,
            'Content-Type': 'multipart/form-data'
        }
    }

    console.log("Inside Add product: ", JSON.stringify(product));

    axios.post(`${ROOT_URL}/addProduct`, formData, config)
        .then(response => {
            console.log("addProduct: ", JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: SELLER_ADD_PRODUCT,
                    payload: response.data,
                })
            }
        },
            error => {
                console.log(" addProduct error:", JSON.stringify(error));
            })
}

export const updateSellerProduct = (product, id) => dispatch => {
    if (typeof (product) == "undefined" || typeof (id) == "undefined") {
        return;
    }

    const data = {
        product: product,
        index: id,
    }
    axios.post(`${ROOT_URL}/updateProduct`, product)
        .then(response => {
            console.log("updateProduct: ", JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: SELLER_UPDATE_PRODUCT,
                    payload: data,
                })
            }
        },
            error => {
                console.log(" updateProduct error:", JSON.stringify(error));
            })

}