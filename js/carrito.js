// Llamadas al DOM
const tablaCarrito = document.querySelector("#productosPrecarrito");
const totalCarrito = document.querySelector("#montoTotal");
const finalizarCompra = document.getElementById("finalizarCompra");
const tipoMoneda = document.querySelector("#tipoMoneda");
let dolarCompra;

window.onload = () => {
	obtenerValorDolar();
};

// Estado Moneda
let dolares = JSON.parse(localStorage.getItem("dolares")) || false;
dolares ? (tipoMoneda.value = "usd") : null;

// Carrito
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Imprimir en DOM
function imprimirItemCarrito(productoAAgregar) {
	let precioTotalProducto = productoAAgregar.precio * productoAAgregar.cantidad;
	tablaCarrito.innerHTML += `
  <td>
    <div class="precart-flex">
      <img src="${productoAAgregar.img}" alt="${
		productoAAgregar.nombre
	}" class="carrito__img marg-precart"/>
      <span class="marg-precart">${productoAAgregar.nombre}</span>
    </div>
  </td>
  <td>${dolares ? "U$" : "$"}${(dolares
		? (precioTotalProducto / parseFloat(dolarCompra)).toFixed(2)
		: precioTotalProducto
	).toLocaleString("en-US", {
		minimumFractionDigits: 2,
	})}
  </td>
  <td>
      <div class="precart-flex">
      <input type="number" class="contform select__margin input__cantidad" value="${
				productoAAgregar.cantidad
			}" min="1" max="99" id="cant${productoAAgregar.id}" />
      <a class="button button__moneda" id="botonEliminar${
				productoAAgregar.id
			}"><img src="https://icongr.am/entypo/trash.svg?size=30&color=currentColor" class="boton__eliminar">
      </a>  
      </div>
  </td> 
`;
}

// Función para limpiar el contenedores
function limpiarContenedor(contenedor) {
	contenedor.innerHTML = "";
}

// Eliminar Item del carrito
function eliminarProductoDelCarrito(producto) {
	let encontrado = carrito.indexOf(producto);
	carrito.splice(encontrado, 1);
}
function eliminarProductoDelDOM(producto) {
	eliminarProductoDelCarrito(producto);
	imprimirCarritoCompleto();
	localStorage.setItem("carrito", JSON.stringify(carrito));
	carrito[0] == undefined ? carritoVacio() : null;
}

// Cambiar cantidad del producto
function cambiarCantidadProductoCarrito(e, producto) {
	const cantidad = e.target;
	cantidad.value <= 0 ? (cantidad.value = 1) : null;
	producto.cantidad = parseInt(cantidad.value);
}
function cambiarCantidadProductoEnDOM(e, producto) {
	cambiarCantidadProductoCarrito(e, producto);
	imprimirCarritoCompleto();
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Impresión de todos los componentes
function imprimirCarritoCompleto() {
	let monto = 0;
	limpiarContenedor(tablaCarrito);
	carrito.forEach((producto) => {
		let precioTotalProducto = producto.precio * producto.cantidad;
		imprimirItemCarrito(producto);
		monto += dolares
			? precioTotalProducto / parseFloat(dolarCompra)
			: precioTotalProducto;
	});
	imprimirMontoTotal(monto);
	darUtilidadABotonesDeItems();
}

// Finalizar Compra
finalizarCompra.addEventListener("click", ejecutarBotonFinalizarCompra);
// Validacion del boton
function ejecutarBotonFinalizarCompra() {
	carrito[0] == undefined
		? mostrarNotificacionCarritoVacio()
		: eliminarTodosLosProductosDelCarrito();
}
// eliminar todos los productos del carrito
function eliminarTodosLosProductosDelCarrito() {
	localStorage.removeItem("carrito");
	location.href = "./fin_de_compra.html";
}
// Alerta de carrito vacio
function mostrarNotificacionCarritoVacio() {
	Toastify({
		text: "El carrito se encuentra vacio.",
		offset: {
			x: 50,
			y: 60,
		},
		position: "right",
		duration: 850,
		style: {
			background: "linear-gradient(to right, #9f0505, #bb3232)",
		},
	}).showToast();
}

function carritoVacio() {
	tablaCarrito.innerHTML = `
  <td class="carrito__vacio--0"></td>
						<td class="carrito__vacio--1">
							<h3>Sin productos seleccionados</h3>
						</td>
						<td class="carrito__vacio--2"></td>
  `;
	imprimirMontoTotal(0);
}

function imprimirMontoTotal(monto) {
	totalCarrito.innerHTML = `<span class="monto">Monto a Pagar:</span> ${
		dolares ? "U$" : "$"
	}${
		dolares
			? monto.toFixed(2)
			: monto.toLocaleString("en-US", {
					minimumFractionDigits: 2,
			  })
	}`;
}

// Selector tipo moneda
tipoMoneda.addEventListener("change", (e) => {
	// Selección de tipo
	const monedaSeleccionada = e.target.value;
	// Determinamos la acción
	if (monedaSeleccionada == "ars") {
		dolares = false;
		localStorage.setItem("dolares", false);
		location.reload();
	} else {
		dolares = true;
		localStorage.setItem("dolares", true);
		location.reload();
	}
});

function darUtilidadABotonesDeItems() {
	carrito.forEach((producto) => {
		document
			.getElementById(`botonEliminar${producto.id}`)
			.addEventListener("click", () => eliminarProductoDelDOM(producto));

		document
			.getElementById(`cant${producto.id}`)
			.addEventListener("change", (e) => {
				cambiarCantidadProductoEnDOM(e, producto);
			});
	});
}

async function obtenerValorDolar() {
	// Llamamos a la API
	const URLDOLAR =
		"https://www.dolarsi.com/api/api.php?type=valoresprincipales";
	const res = await fetch(URLDOLAR);
	const data = await res.json();
	const dolarBlue = data.find((dolar) => dolar.casa.nombre == "Dolar Blue");
	dolarCompra = dolarBlue.casa.compra;

	// Carga del carrito post llegada del precio del dolar
	carrito[0] == undefined ? carritoVacio() : imprimirCarritoCompleto();
}
