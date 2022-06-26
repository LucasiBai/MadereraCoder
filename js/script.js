// LLamadas al DOM
const contenedorArticulos = document.getElementById("productosHtml");
const tablaCarrito = document.querySelector("#productosPrecarrito");
const totalCarrito = document.querySelector("#montoTotal");
const tipoMoneda = document.querySelector("#tipoMoneda");
const finalizarCompra = document.getElementById("finalizarCompra");
let dolarCompra;

window.onload = () => {
	obtenerValorDolar();
};

// Estado Moneda

let dolares = JSON.parse(localStorage.getItem("dolares")) || false;
dolares ? (tipoMoneda.value = "usd") : null;

// Carrito
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para limpiar el contenedor de productos
function limpiarContenedor(contenedor) {
	contenedor.innerHTML = "";
}

// Función para imprimir los productos
function imprimirProductosAlContenedor(listaProductos) {
	// Si no existe el elemento retonamos
	if (!contenedorArticulos) return;
	// Limpiamos contenedor
	limpiarContenedor(contenedorArticulos);

	// Recorremos el array de productos
	for (let producto of listaProductos) {
		// Agregamos producto correspondiente
		contenedorArticulos.innerHTML += `<article class="articulos"><img src=${
			producto.img
		} class="articulos__img" />
    <h3 class="articulos__nombre">${producto.nombre}</h3>
    <h3 class="articulos__clasificacion">${producto.categoria}</h3>
    <div class="articulos__botton-precio">
      <h3 class="articulos__precio">${
				dolares ? "U$" : "$"
			}${producto.precio.toLocaleString("en-US", {
			minimumFractionDigits: 2,
		})}</h3>
      <button class="button button__carrito" id="agregarCarrito${producto.id}">
      Agregar al Carrito
      </button>
    </div></article>`;
	}

	// Damos propiedad a los botones
	listaProductos.forEach((producto) => {
		// Evento
		document
			.getElementById(`agregarCarrito${producto.id}`)
			.addEventListener("click", () => {
				agregarAlCarrito(producto);
			});
	});
}

// Función filtrar
function filtrarProductos(categoria) {
	return productos.filter((producto) => producto.categoria == categoria);
}
// Array con productos por categoría
const productosEscritorios = filtrarProductos("Escritorios");
const productosEstanterias = filtrarProductos("Estanterías");
const productosHabitacion = filtrarProductos("Habitación");
const productosSillasYSillones = filtrarProductos("Sillas y Sillones");
const productosMesasYRatoneras = filtrarProductos("Mesas y Ratoneras");

let categoriaCargada = productos;
// Llamamos a los selectores
// Selector de categorías
const selectorCategorias = document.getElementById("selectorCategorias");
// Evento para cambiar categoría
// Si existe el elemento, agregamos evento
if (selectorCategorias) {
	selectorCategorias.addEventListener("change", (e) => {
		// Seleccionamos la categoria
		const categoriaSeleccionada = e.target.value;

		// Imprimimos la categoria seleccionada
		switch (categoriaSeleccionada) {
			case "escritorios":
				cargarCategoriaSegunMoneda(productosEscritorios);
				selectorOrden.value = "none";
				break;
			case "estanterias":
				cargarCategoriaSegunMoneda(productosEstanterias);
				selectorOrden.value = "none";
				break;
			case "habitacion":
				cargarCategoriaSegunMoneda(productosHabitacion);
				selectorOrden.value = "none";
				break;
			case "sillasysillones":
				cargarCategoriaSegunMoneda(productosSillasYSillones);
				selectorOrden.value = "none";
				break;
			case "mesasyratoneras":
				cargarCategoriaSegunMoneda(productosMesasYRatoneras);
				selectorOrden.value = "none";
				break;
			default:
				cargarCategoriaSegunMoneda(productos);
				selectorOrden.value = "none";
		}
	});
}

function cargarCategoriaSegunMoneda(productos) {
	dolares
		? cambiarTipoDeMoneda(dolarCompra, productos)
		: imprimirProductosAlContenedor(productos);
	categoriaCargada = productos;
}

// Selector de orden
const selectorOrden = document.getElementById("selectorOrden");
// Evento para cambiar orden
// Si existe el elemento, agregamos evento
if (selectorOrden) {
	selectorOrden.addEventListener("change", (e) => {
		// Seleccionamos la categoria
		const ordenSeleccionado = e.target.value;
		// Imprimimos la categoria seleccionada
		ordenSeleccionado == "maM"
			? imprimirProductosAlContenedor(
					categoriaCargada.sort((a, b) => a.precio - b.precio)
			  )
			: ordenSeleccionado == "Mam"
			? imprimirProductosAlContenedor(
					categoriaCargada.sort((a, b) => b.precio - a.precio)
			  )
			: imprimirProductosAlContenedor(categoriaCargada);
	});
}

// Agregar al carrito
function agregarAlCarrito(productoAAgregar) {
	// Notificación de carga al carrito
	mostrarNotificacionCarrito(productoAAgregar);
	// condicional para no agregar de nuevo
	const encontrado = carrito.find(({ id }) => id == productoAAgregar.id);
	const productoOriginal = productos.filter(
		({ id }) => id == productoAAgregar.id
	);
	if (encontrado) {
		carrito.map((producto) =>
			producto.id == productoAAgregar.id ? (producto.cantidad += 1) : null
		);
	} else {
		carrito.push(productoOriginal[0]);
	}

	// Actualizamos el local storage
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Notificación de producto agregado al carrito
function mostrarNotificacionCarrito(productoAAgregar) {
	Toastify({
		text: `Has agregado ${productoAAgregar.nombre} al carrito.`,
		offset: {
			x: 50,
			y: 60,
		},
		position: "right",
		duration: 2000,
		style: {
			background: "linear-gradient(to right, #de8500, #c97900)",
		},
	}).showToast();
}

function imprimirCarrito(productoAAgregar) {
	if (!tablaCarrito) return;
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

function eliminarProductoDelCarrito(producto) {
	let encontrado = carrito.indexOf(producto);
	carrito.splice(encontrado, 1);
}

function eliminarProductoDelDOM(producto) {
	eliminarProductoDelCarrito(producto);
	actualizarCarrito();
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Seguir con esto
function cambiarCantidadProductoCarrito(e, producto) {
	const cantidad = e.target;
	cantidad.value <= 0 ? (cantidad.value = 1) : null;
	producto.cantidad = parseInt(cantidad.value);
}

function cambiarCantidadProductoEnDOM(e, producto) {
	cambiarCantidadProductoCarrito(e, producto);
	actualizarCarrito();
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarCarrito() {
	let monto = 0;
	limpiarContenedor(tablaCarrito);
	carrito.forEach((producto) => {
		let precioTotalProducto = producto.precio * producto.cantidad;
		imprimirCarrito(producto);
		monto += dolares
			? precioTotalProducto / parseFloat(dolarCompra)
			: precioTotalProducto;
	});
	totalCarrito.innerHTML = `<span class="monto">Monto a Pagar:</span> ${
		dolares ? "U$" : "$"
	}${
		dolares
			? monto.toFixed(2)
			: monto.toLocaleString("en-US", {
					minimumFractionDigits: 2,
			  })
	}`;
	darUtilidadCarrito();
}

// Selector tipo moneda
// Si existe elemento, agregamos evento
if (tipoMoneda) {
	tipoMoneda.addEventListener("change", (e) => {
		// Selección de tipo
		const monedaSeleccionada = e.target.value;
		// Determinamos la acción
		if (monedaSeleccionada == "ars") {
			dolares = false;
			imprimirProductosAlContenedor(categoriaCargada);
			localStorage.setItem("dolares", false);
			tablaCarrito ? location.reload() : null;
		} else {
			dolares = true;
			cambiarTipoDeMoneda(dolarCompra, categoriaCargada);
			localStorage.setItem("dolares", true);
			tablaCarrito ? location.reload() : null;
		}
	});
}

function cambiarTipoDeMoneda(moneda, productos) {
	let productosDiferentePrecio = productos.map((producto) => ({
		...producto,
		precio: (producto.precio / parseFloat(moneda)).toFixed(2),
	}));
	imprimirProductosAlContenedor(productosDiferentePrecio);
}

async function obtenerValorDolar() {
	// Llamamos a la API
	const URLDOLAR =
		"https://www.dolarsi.com/api/api.php?type=valoresprincipales";
	const res = await fetch(URLDOLAR);
	const data = await res.json();
	const dolarBlue = data.find((dolar) => dolar.casa.nombre == "Dolar Blue");
	dolarCompra = dolarBlue.casa.compra;

	// Ejecutamos la impresión de los productos según estado de moneda
	dolares
		? cambiarTipoDeMoneda(dolarCompra, productos)
		: imprimirProductosAlContenedor(productos);

	// Carga del carrito post llegada del precio del dolar
	if (carrito !== [] && totalCarrito) {
		actualizarCarrito();
	} else if (carrito === []) {
		console.log("holi");
	}
}

function darUtilidadCarrito() {
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
