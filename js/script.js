// solicitud de productos
let carrito = [];

let seguirComprando;
while (seguirComprando !== "no") {
	carrito.push(
		parseFloat(
			prompt(
				"¿Cuál es el precio del producto que quieres comprar?\n(Precio solo con números)\n Cajonera = $35.000\n Estanteria = $45.000\n Escritorio Gamer = $55.000"
			)
		)
	);
	seguirComprando = prompt("¿Quieres seguir comprando?").toLowerCase();
}

// Fución con los cálculos
function calcularCostoProductos(preciosProductos) {
	let costoTotalDeProductos = 0;

	for (let precioProducto of preciosProductos) {
		costoTotalDeProductos = costoTotalDeProductos + precioProducto;
	}
	return costoTotalDeProductos;
}

// Sacar precio de la funcion
let costoTotalDeProductos = calcularCostoProductos(carrito);

// Alert con el total
alert("El total a pagar sería: $" + costoTotalDeProductos);
