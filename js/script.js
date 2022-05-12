//Productos
const productos = [
	{ nombre: "cajonera", precio: 35000, categoria: "Escritorios" },
	{ nombre: "estanteria", precio: 45000, categoria: "Estanterías" },
	{ nombre: "escritorio gamer", precio: 55000, categoria: "Escritorios" },
];

const carrito = [];
let seguirComprando = true;

while (seguirComprando) {
	let itemAComprar = prompt(
		"¿Cuál producto quieres comprar?\n Cajonera = $35.000\n Estanteria = $45.000\n Escritorio Gamer = $55.000"
	);
	carrito.push(itemAComprar.toLowerCase());
	seguirComprando = confirm("¿Quieres agregar otro producto al carrito?");
}

function calcularTotalCompra(listaDeProductos) {
	let precioTotal = 0;

	for (const producto of listaDeProductos) {
	}

	return precioTotal;
}

// Sacar precio de la funcion
let precioTotal = calcularCostoProductos(carrito);

// Alert con el total
alert("El total a pagar sería: $" + costoTotalDeProductos);
