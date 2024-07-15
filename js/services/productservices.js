const BASE_URL = 'https://my-json-server.typicode.com/guillermotopp/AluraGeek-by-Guillermo-Topp';

const productList = () => {
    return fetch(`${BASE_URL}/products`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const createProducts = (name, price, image) => {
    return fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            price,
            image,
        }),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const deleteProduct = (productId) => {
    return fetch(`${BASE_URL}/products/${productId}`, {
        method: 'DELETE',
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const servicesProducts = {
    productList,
    createProducts,
    deleteProduct,
};
