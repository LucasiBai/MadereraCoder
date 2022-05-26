//Funciones
// Función para agregar elemento al carrito
function agregarAlCarrito(itemABuscar) {
	//Busqueda del producto
	let item = productos.find((producto) => producto.nombre == itemABuscar);
	console.log(item);

	// Creación de la Card
	let cardCarrito = document.createElement("tr");
	// Añadimos artículo al carrito
	cardCarrito.innerHTML = `
  <td><div class="precart-flex"><img src="${item.img}" alt="${
		item.nombre
	}" class="carrito__img marg-precart"><span class=" marg-precart">${
		item.nombre
	}</span></div></td>
  <td>$${item.precio.toLocaleString("en-US", {
		minimumFractionDigits: 2,
	})}</td>
  <td><select
  class="button select__margin"
>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  </select></td>
`;
	precarritoCompras.appendChild(cardCarrito);
}

//Productos
const productos = [
	{
		id: 0,
		nombre: "Cajonera",
		precio: 35000,
		categoria: "Escritorios",
		img: "../Assets/Img/cajonera1.jpg",
	},
	{
		id: 1,
		nombre: "Estanteria",
		precio: 45000,
		categoria: "Estanterías",
		img: "../Assets/Img/mueble6.jpeg",
	},
	{
		id: 2,
		nombre: "Escritorio Gamer",
		precio: 55000,
		categoria: "Escritorios",
		img: "../Assets/Img/mueble5.jpg",
	},
];

let precarritoCompras = document.getElementById("productosPrecarrito");

// Agregar elementos al carrito
// LLamado de los botones
let botonCajonera = document.querySelector("#boton0");
let botonEscritorio = document.querySelector("#boton1");
let botonEstanteria = document.querySelector("#boton2");

// Agregamos eventos
botonCajonera.addEventListener("click", () => agregarAlCarrito("Cajonera"));
botonEscritorio.addEventListener("click", () =>
	agregarAlCarrito("Escritorio Gamer")
);
botonEstanteria.addEventListener("click", () => agregarAlCarrito("Estanteria"));
