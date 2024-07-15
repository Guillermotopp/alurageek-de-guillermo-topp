// main.js

import { servicesProducts } from "../services/productservices.js";

const productosContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="${name}">
            <p class="no-productos" data-product="no-productos">No se han agregado productos</p>
        </div>
        <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--value">
                <p>${price}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="./imagenes/trash.png" alt="eliminar producto">
                </button>
            </div>
        </div>
    `;

    productosContainer.appendChild(card);

    // Agregar evento de click para eliminar producto
    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", async () => {
        try {
            const productId = deleteButton.getAttribute("data-id");
            await servicesProducts.deleteProduct(productId);
            card.remove(); // Eliminar la tarjeta del DOM
        } catch (error) {
            console.log(error);
        }
    });

    return card;
}

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        productosContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar
        listProducts.forEach(product => {
            createCard(product.name, product.price, product.image, product.id);
        });
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    // Agregar el nuevo producto al servidor y renderizar nuevamente
    try {
        await servicesProducts.createProducts(name, price, image);
        render();
    } catch (error) {
        console.log(error);
    }
});

render();
