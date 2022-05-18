//Funciones
function mostrarCostoTotal(preciosItems) {
	let precioTotalDeLaCompra = preciosItems.reduce(
		(suma, precio) => suma + precio,
		0
	);
	alert("El total a pagar sería: $" + precioTotalDeLaCompra);
}

//Productos
const productos = [
	{ nombre: "cajonera", precio: 35000, categoria: "Escritorios" },
	{ nombre: "estanteria", precio: 45000, categoria: "Estanterías" },
	{ nombre: "escritorio gamer", precio: 55000, categoria: "Escritorios" },
];

let seguirComprando = false;
let carrito = [];

// Ciclo
do {
	// Solicitud del producto deseado
	let itemSeleccionado = prompt(
		"¿Cuál producto quieres comprar?\n(colocar nombre del producto a adquirir)\n Cajonera = $35.000\n Estanteria = $45.000\n Escritorio Gamer = $55.000"
	).toLocaleLowerCase();

	// Búsqueda del producto a comprar
	let itemProducto = productos.find(
		(producto) => producto.nombre == itemSeleccionado
	);

	// Filtro de productos no encontrados
	if (itemProducto == undefined) {
		seguirComprando = true;
		alert("El producto seleccionado no fue encontrado.");
	} else {
		// Pusheo del precio al carrito
		carrito.push(itemProducto.precio);
	}

	// Solicitud de seguir comprando
	seguirComprando = confirm("¿Quieres agregar otro producto al carrito?");
} while (seguirComprando);

// Ejecución de la suma
mostrarCostoTotal(carrito);
