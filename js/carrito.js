let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoTitulo = document.querySelector("#carrito-titulo")
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoTitulo.classList.remove("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <h4>Producto</h4>
                    <h5>${producto.titulo}</h5>
                </div>
                <div class="carrito-producto-cantidad">
                    <h4>Cantidad</h4>
                    <h5>${producto.cantidad}</h5>
                </div>
                <div class="carrito-producto-precio">
                    <h4>Precio</h4>
                    <h5>$${producto.precio}</h5>
                </div>
                <div class="carrito-producto-subtotal">
                    <h4>Subtotal</h4>
                    <h5>$${producto.precio * producto.cantidad}</h5>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoTitulo.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado ❌",
        duration: 2000,
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
            y: '15em'
          },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
Swal.fire({
    title: '¿Estás seguro?',
    text: "Se eliminaran todos los productos!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#253A2F',
    cancelButtonColor: '#253A2F',
    focusConfirm: false,
    confirmButtonText: 'Sí, eliminar!',
    cancelButtonText: 'No, cancelar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Todos los productos han sido borrados!',
                text: 'Regresa a la tienda para seguir comprando',
                confirmButtonText: 'OK',
                confirmButtonColor: '#253A2F',
            });

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
    }
  })
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    Swal.fire({
        title: '¿Confirmar compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#253A2F',
        cancelButtonColor: '#253A2F',
        focusConfirm: false,
        confirmButtonText: 'Sí, confirmar!',
        cancelButtonText: 'No, cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tu compra se realizó con exito!',
                    text: 'Te enviaremos la confirmación por mail',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#253A2F',
                });

        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
                
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoTitulo.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.remove("disabled");
        }
    })
};