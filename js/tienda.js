let productos = [];
const cargarProductosStock = async () => {
    const response = await fetch("../js/productos.json");
    const data = await response.json();
    productos = data;
    cargarProductos(productos);
}
cargarProductosStock();

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria"); 
const tituloPrincipal = document.querySelector("#titulo-tienda");
let botonesAgregar = document.querySelectorAll(".add-cart");
const numeritoCarrito = document.querySelector("#numerito-carrito");

function cargarProductos(productos) {
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product-img" src="${producto.imagen}" alt="${producto.titulo}">     
            <div class="product-info">
                <h4 class="product-title">${producto.titulo}</h4>
                <p class="product-description">${producto.descripcion}</p>
                <p class="product-price">$${producto.precio}</p>
                <button class="add-cart" id="${producto.id}">AÑADIR AL CARRITO</button>
            </div>  
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
};

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre.toUpperCase();
            const categoriaActive = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(categoriaActive);
        } else {
            tituloPrincipal.innerText = "TODOS LOS PRODUCTOS";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".add-cart");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    Toastify({
        text: "Producto agregado ☑️",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #253A2F, #253A2F)",
          borderRadius: ".5rem",
          textTransform: "uppercase",
          fontSize: "1em",
          fontFamilly: 'Yantramanav',
        },
        offset: {
            x: '1em',
            y: '5em'
          },
        onClick: function(){}
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto =>
        producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    if (nuevoNumerito > 0) {
        numeritoCarrito.innerText = nuevoNumerito;
    }
}