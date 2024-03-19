const navburger = document.querySelector("#navburger");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    navburger.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    navburger.classList.remove("visible");
})