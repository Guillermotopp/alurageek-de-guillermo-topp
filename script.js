document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.querySelector('.productos-container');
    const noProductosMessage = document.querySelector('.no-productos');
    const form = document.getElementById('form-agregar-producto');

    let productos = [];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombre = form.nombre.value;
        const precio = form.precio.value;
        const imagen = form.imagen.value;

        if (nombre && precio && imagen) {
            const nuevoProducto = { nombre, precio, imagen };
            productos.push(nuevoProducto);
            renderProductos();
            form.reset();
        }
    });

    function renderProductos() {
        productosContainer.innerHTML = '';
        if (productos.length === 0) {
            noProductosMessage.style.display = 'block';
        } else {
            noProductosMessage.style.display = 'none';
            productos.forEach(producto => {
                const card = document.createElement('div');
                card.classList.add('product-card');

                card.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="card-container--info">
                        <p>${producto.nombre}</p>
                        <div class="card-container--value">
                            <p>$${producto.precio}</p>
                            <img src="path/to/trashIcon.png" alt="Eliminar" class="eliminar-producto">
                        </div>
                    </div>
                `;

                productosContainer.appendChild(card);
            });
        }
    }

    productosContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('eliminar-producto')) {
            const card = event.target.closest('.product-card');
            const nombreProducto = card.querySelector('.card-container--info p').textContent;
            productos = productos.filter(producto => producto.nombre !== nombreProducto);
            renderProductos();
        }
    });

    renderProductos();
});
