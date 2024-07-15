import { servicesProducts } from "../services/productservices.js";

const productosContainer = document.querySelector("[data-product]");

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
                    <img src="./imagenes/Button.png" alt="eliminar producto">
                </button>
            </div>
        </div>
    `;

    productosContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        if (listProducts.length === 0) {
            const noProductsMessage = document.querySelector(".no-productos");
            noProductsMessage.style.display = "block";
        } else {
            listProducts.forEach(product => {
                createCard(product.name, product.price, product.image, product.id);
            });
        }
    } catch (error) {
        console.log(error);
    }
};

render();
