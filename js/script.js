//Funciones
function mostrarCostoTotal(preciosItems) {
	let precioTotalDeLaCompra = preciosItems.reduce(
		(suma, precio) => suma + precio,
		0
	);
	alert("El total a pagar sería: $" + precioTotalDeLaCompra);
}

function añadirCardCarrito(itemProducto) {
	// creación de la Card
	let cardCarrito = document.createElement("article");
	cardCarrito.className = "carrito__flex";
	// añadimos artículo al html
	cardCarrito.innerHTML = `
  <!-- Imagen producto -->
  <div>
    <img
      src="${itemProducto.img}"
      alt="${itemProducto.nombre}"
      class="carrito__img carrito__item"
    />
  </div>
  <!-- Nombre Producto -->
  <div
    class="items__carrito--flex">
    <h4
      class="text__carrito carrito__item carrito__item--color carrito__itemb"
    >
    ${itemProducto.nombre}
    </h4>
  </div>
  <!-- Precio -->
  <div
    class="items__carrito--flex carrito__precio--m">
    <h4
      class="text__carrito carrito__item carrito__item--color carrito__itemb"
    >
      $${itemProducto.precio / 1000}.000
    </h4>
  </div>
  <!-- Cantidad y Opciones -->
  <div
    class="items__carrito--flex carrito__cantidad">
    <select
      class="button select_size button__ordenarpor carrito__item--cantidad carrito__itemb"
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>
`;
	carritoCompras.appendChild(cardCarrito);
}

//Productos
const productos = [
	{
		nombre: "Cajonera",
		precio: 35000,
		categoria: "Escritorios",
		img: "../Assets/Img/cajonera1.jpg",
	},
	{
		nombre: "Estanteria",
		precio: 45000,
		categoria: "Estanterías",
		img: "../Assets/Img/mueble6.jpeg",
	},
	{
		nombre: "Escritorio Gamer",
		precio: 55000,
		categoria: "Escritorios",
		img: "../Assets/Img/mueble5.jpg",
	},
];

// Variables para bucles
let seguirComprando = false;
let carrito = [];

// Llamado del html
let carritoCompras = document.getElementById("carrito");

// Ciclo
do {
	// Solicitud del producto deseado
	let itemSeleccionado = prompt(
		"¿Cuál producto quieres comprar?\n(colocar nombre del producto a adquirir)\n Cajonera = $35.000\n Estanteria = $45.000\n Escritorio Gamer = $55.000"
	).toLocaleLowerCase();

	// Búsqueda del producto a comprar
	let itemProducto = productos.find(
		(producto) => producto.nombre.toLocaleLowerCase() == itemSeleccionado
	);

	// Filtro de productos no encontrados
	if (itemProducto == undefined) {
		seguirComprando = true;
		alert("El producto seleccionado no fue encontrado.");
	} else {
		// Pusheo del precio al carrito
		carrito.push(itemProducto.precio);
		añadirCardCarrito(itemProducto);
	}

	// Solicitud de seguir comprando
	seguirComprando = confirm("¿Quieres agregar otro producto al carrito?");
} while (seguirComprando);

// Ejecución de la suma
mostrarCostoTotal(carrito);
