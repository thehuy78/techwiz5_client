import axios from 'axios';

const urlApi = "https://localhost:7229/api/";

export const apiRequestAutherize = async (method, uri, cookies, data = null) => {
    try {
        const config = {
            method: method,
            url: urlApi + uri,
            headers: {
                "Content-Type": "application/json",
            }
        };
        if (cookies) {
            config.headers.Authorization = `Bearer ${cookies}`;
        }
        if (data) {
            config.data = data;
        }
        const response = await axios(config);
        return response;
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
};


export const apiRequestAutherizeForm = async (method, uri, cookies, data = null) => {
    try {
        const config = {
            method: method,
            url: urlApi + uri,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        };
        if (cookies) {
            config.headers.Authorization = `Bearer ${cookies}`;
        }
        if (data) {
            config.data = data;
        }
        const response = await axios(config);
        return response;
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
};

