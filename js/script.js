const contenedorArticulos = document.getElementById("productosHtml");
const totalCarrito = document.querySelector("#montoTotal");
// Ejecutamos la impresión de los productos
imprimirProductosAlContenedor(productos);

// Función para imprimir los productos
function imprimirProductosAlContenedor(listaProductos) {
	// Si no existe el elemento retonamos
	if (!contenedorArticulos) return;
	// Limpiamos contenedor
	limpiarContenedorProductos();

	// Recorremos el array de productos
	for (let producto of listaProductos) {
		// Agregamos producto correspondiente
		contenedorArticulos.innerHTML += `<article class="articulos"><img src=${
			producto.img
		} class="articulos__img" />
    <h3 class="articulos__nombre">${producto.nombre}</h3>
    <h3 class="articulos__clasificacion">${producto.categoria}</h3>
    <div class="articulos__botton-precio">
      <h3 class="articulos__precio">$${producto.precio.toLocaleString("en-US", {
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

// Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
if (carrito != []) {
	let monto = 0;
	for (let producto of carrito) {
		imprimirCarrito(producto);
		monto += producto.precio * producto.cantidad;
	}
	totalCarrito.innerHTML = `<span class="monto">Monto a Pagar:</span> $${monto.toLocaleString(
		"en-US",
		{
			minimumFractionDigits: 2,
		}
	)}`;
}

// Agregar al carrito
function agregarAlCarrito(productoAAgregar) {
	// Notificación de carga al carrito
	mostrarNotificacionCarrito(productoAAgregar);
	// condicional para no agregar de nuevo *terminar*
	if (carrito.includes(productoAAgregar)) {
		productoAAgregar.cantidad += 1;
		document.getElementById(`cant${productoAAgregar.id}`).value =
			productoAAgregar.cantidad;
	} else {
		carrito.push(productoAAgregar);
		// Imprimimos producto en el html
		imprimirCarrito(productoAAgregar);
	}

	// Actualizamos el local storage
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

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
	const element = document.querySelector("#productosPrecarrito");

	if (!element) return;

	element.innerHTML += `
  <td>
    <div class="precart-flex">
      <img src="${productoAAgregar.img}" alt="${
		productoAAgregar.nombre
	}" class="carrito__img marg-precart"/>
      <span class="marg-precart">${productoAAgregar.nombre}</span>
    </div>
  </td>
  <td>
    $${(productoAAgregar.precio * productoAAgregar.cantidad).toLocaleString(
			"en-US",
			{
				minimumFractionDigits: 2,
			}
		)}
  </td>
  <td>
    <input type="number" class="contform select__margin" value="${
			productoAAgregar.cantidad
		}" id="cant${productoAAgregar.id}" />
  </td> 
`;
}

// Función para limpiar el contenedor de productos
function limpiarContenedorProductos() {
	contenedorArticulos.innerHTML = "";
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
				imprimirProductosAlContenedor(productosEscritorios);
				sessionStorage.setItem("estadoCarga", "productosEscritorios");
				break;
			case "estanterias":
				imprimirProductosAlContenedor(productosEstanterias);
				sessionStorage.setItem("estadoCarga", "productosEstanterias");
				break;
			case "habitacion":
				imprimirProductosAlContenedor(productosHabitacion);
				sessionStorage.setItem("estadoCarga", "productosHabitacion");
				break;
			case "sillasysillones":
				imprimirProductosAlContenedor(productosSillasYSillones);
				sessionStorage.setItem("estadoCarga", "productosSillasYSillones");
				break;
			case "mesasyratoneras":
				imprimirProductosAlContenedor(productosMesasYRatoneras);
				sessionStorage.setItem("estadoCarga", "productosMesasYRatoneras");
				break;
			default:
				imprimirProductosAlContenedor(productos);
				sessionStorage.setItem("estadoCarga", "productos");
		}
	});
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
					productos.sort((a, b) => a.precio - b.precio)
			  )
			: ordenSeleccionado == "Mam"
			? imprimirProductosAlContenedor(
					productos.sort((a, b) => b.precio - a.precio)
			  )
			: imprimirProductosAlContenedor(productos);
	});
}
