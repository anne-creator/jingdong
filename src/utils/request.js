import axios from "axios";
const instance = axios.create({
    baseURL:
        "https://www.fastmock.site/mock/412aff5a92fe07ad39f07920086f3a35/pet",

    timeout: 10000,
});

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        instance
            .post(url, data, {
                headers: { "Content-Type": "application/jason" },
            })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};

export const get = async (url, params = {}) => {
    const result = await instance.get(url, { params });
    return result.data;
};
