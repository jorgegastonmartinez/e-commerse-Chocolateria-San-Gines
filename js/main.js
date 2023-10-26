/**************** PRE ENTREGA 3  *********/

const productos = [
    // Almuerzo y Cena
    {
        id: "bocata-de-tortilla",
        titulo: "BOCATA DE TORTILLA",
        descripcion: "baguette, tortilla de papas, alioli y tomates secos",
        imagen: "../img/bocata-de-tortilla.jpg",
        categoria: {
            nombre: "Almuerzo y Cena",
            id: "almuerzoYCena"
        },
        precio: 1800
    },
    {
        id: "bocata-de-atun",
        titulo: "BOCATA DE ATÚN",
        descripcion: "baguette, atún, rúcula, pepinillos agridulces, pesto y tomate natural",
        imagen: "../img/bocata-de-atun.jpg",
        categoria: {
            nombre: "Almuerzo y Cena",
            id: "almuerzoYCena"
        },
        precio: 2000
    },
    {
        id: "ensalada-vegetariana",
        titulo: "ENSALADA VEGETARIANA",
        descripcion: "mix de hojas verdes, vinagreta,atún, tomate, huevo, pepinillos agridulces y aceitunas",
        imagen: "../img/ensalada-vegeta.jpg",
        categoria: {
            nombre: "Almuerzo y Cena",
            id: "almuerzoYCena"
        },
        precio: 1600
    },
    {
        id: "bocata-de-pollo",
        titulo: "BOCATA DE POLLO",
        descripcion: "baguette, pollo asado,rúcula, queso con hierbas y tomates secos",
        imagen: "../img/bocata-de-pollo.jpg",
        categoria: {
            nombre: "Almuerzo y Cena",
            id: "almuerzoYCena"
        },
        precio: 2000
    },
    {
        id: "bocata-vegeta",
        titulo: "BOCATA VEGETARIANO",
        descripcion: "baguette, berenjena, zucchini, queso, rúcula y pesto",
        imagen: "../img/bocata-vegeta.jpg",
        categoria: {
            nombre: "Almuerzo y Cena",
            id: "almuerzoYCena"
        },
        precio: 1700
    }, 
    {
        id: "bocata-jamon-crudo",
        titulo: "BOCATA DE JAMON CRUDO",
        descripcion: "baguette, jamón crudo, queso, rúcula, pesto y tomates secos",
        imagen: "../img/bocata-jamon-crudo.jpg",
        categoria: {
            nombre: "Almuerzo y Cena",
            id: "almuerzoYCena"
        },
        precio: 2000
    },    
    // Cafetería
    {
        id: "cappuccino",
        titulo: "CAPPUCCINO",
        descripcion: "café espresso, leche texturizada, cacao y canela",
        imagen: "../img/cappuccino.jpg",
        categoria: {
            nombre: "Cafetería",
            id: "cafeteria"
        },
        precio: 800
    },
    {
        id: "latte",
        titulo: "LATTE",
        descripcion: "café espresso y leche texturizada",
        imagen: "../img/latte.jpg",
        categoria: {
            nombre: "Cafetería",
            id: "cafeteria"
        },
        precio: 900
    },
    // Churrería
    {
        id: "churros-y-chocolate",
        titulo: "CHURROS Y CHOCOLATE",
        descripcion: "3 churros y chocolate San Ginés",
        imagen: "../img/combo-churros-choco.jpg",
        categoria: {
            nombre: "Churrería",
            id: "churreria"
        },
        precio: 1500
    },
    {
        id: "combo-mix",
        titulo: "MIX Y CHOCOLATE",
        descripcion: "2 churros, 1 porra y chocolate San Ginés",
        imagen: "../img/combo-mix.jpg",
        categoria: {
            nombre: "Churrería",
            id: "churreria"
        },
        precio: 1500
    },
    // Desayuno Y Merienda
    {
        id: "desayuno-argentino",
        titulo: "DESAYUNO ARGENTINO",
        descripcion: "café latte, tostadas de pan, dulce de leche y manteca",
        imagen: "../img/desayuno-argentino.jpg",
        categoria: {
            nombre: "Desayuno Y Merienda",
            id: "desayunoYMerienda"
        },
        precio: 1700
    },
    {
        id: "cafe-con-leche-y-medialunas",
        titulo: "CAFÉ CON LECHE Y MEDIALUNAS",
        descripcion: "café latte y 2 medialunas de manteca",
        imagen: "../img/cafe-con-leche-y-medialunas.jpg",
        categoria: {
            nombre: "Desayuno Y Merienda",
            id: "desayunoYMerienda"
        },
        precio: 1900
    },
    {
        id: "TOSTADAS CON QUESO Y MERMELADA",
        titulo: "CAFÉ CON LECHE Y MEDIALUNAS",
        descripcion: "tostadas de baguette integral, queso crema y mermelada",
        imagen: "../img/tostadas-con-queso-mermelada.jpg",
        categoria: {
            nombre: "Desayuno Y Merienda",
            id: "desayunoYMerienda"
        },
        precio: 1900
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-tienda");
let botonesAgregar = document.querySelectorAll(".add-cart");
const numeritoCarrito = document.querySelector("#numerito-carrito");

// recorro todas las categorias
function cargarProductos(categoriaElegida) {
    // cuando entre a la funcion, quiero que se vacie todo!
    contenedorProductos.innerHTML = "";

    categoriaElegida.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product-img" src="${producto.imagen}" alt="${productos.titulo}">     
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
}

// coloco productos como parametro, para que cuando inicie la pagina cargue siempre "todos los productos", luego aplico filter.
cargarProductos(productos);

// creo las categorias
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        //remuevo la clase active
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        //agrego la clase active cuando hago "click"
        e.currentTarget.classList.add("active");

        // aplico un filter a todas las categorias para cuando hago un "click", me muestre solo esos productos en "active"
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre.toUpperCase(); // ACA LE CAMBIO EL TITULO SEGUN CATEGORIA.
            const categoriaActive = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(categoriaActive);
        } else {
            tituloPrincipal.innerText = "TODOS LOS PRODUCTOS";
            cargarProductos(productos); // de lo contrario me muestre todos los productos
        }
    })
});

// le doy funcionalidad a "añador al carrito"

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".add-cart");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito); // agregarAlCarrito la voy a definir mas adelante.
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = []; // creo un array donde se van a almacenar todos los productos que voy añadiendo al carrtio
}

function agregarAlCarrito(e) {
    // id porque llamo al id del boton agregar al carrito. lo defini mas arriba.
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto =>
        producto.id === idBoton);
    // chequeo en el carrito que no halla un producto agregado con ese nombre, si lo hay, no lo duplico, si no que le sumo con el numerito.
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        // con el index, busco el producto que ya existe, para aumentarle la cantidad de 1, que declaro abajo.
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        // cantidad, es una propiedad nueva que va a existir en el carrito cuando yo agregue un producto nuevo, por eso comienza en 1.
        productoAgregado.cantidad = 1;
        // si el producto no esta, con push lo agrego.
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito(); // la declaro mas abajo, es el numerito debajo del carrito de compras

    // lo guardo en el localStorage asi despues me lo llevo al html del carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// actualizo el numerito del carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeritoCarrito.innerText = nuevoNumerito;
}