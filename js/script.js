// //Funciones
// // Función para agregar elemento al carrito
// function agregarAlCarrito(itemABuscar) {
// 	//Busqueda del producto
// 	let item = productos.find((producto) => producto.nombre == itemABuscar);
// 	console.log(item);

// 	// Creación de la Card
// 	let cardCarrito = document.createElement("tr");
// 	// Añadimos artículo al carrito
// 	cardCarrito.innerHTML = `
//   <td><div class="precart-flex"><img src="${item.img}" alt="${
// 		item.nombre
// 	}" class="carrito__img marg-precart"><span class=" marg-precart">${
// 		item.nombre
// 	}</span></div></td>
//   <td>$${item.precio.toLocaleString("en-US", {
// 		minimumFractionDigits: 2,
// 	})}</td>
//   <td><select
//   class="button select__margin"
// >
//   <option value="1">1</option>
//   <option value="2">2</option>
//   <option value="3">3</option>
//   <option value="4">4</option>
//   <option value="5">5</option>
//   </select></td>
// `;
// 	precarritoCompras.appendChild(cardCarrito);
// }

// let precarritoCompras = document.getElementById("productosPrecarrito");

// // Agregar elementos al carrito
// // LLamado de los botones
// let botonCajonera = document.querySelector("#boton0");
// let botonEscritorio = document.querySelector("#boton1");
// let botonEstanteria = document.querySelector("#boton2");

// // Agregamos eventos
// botonCajonera.addEventListener("click", () => agregarAlCarrito("Cajonera"));
// botonEscritorio.addEventListener("click", () =>
// 	agregarAlCarrito("Escritorio Gamer")
// );
// botonEstanteria.addEventListener("click", () => agregarAlCarrito("Estanteria"));

const contenedorArticulos = document.getElementById("productosHtml");

// Función para imprimir los productos
function imprimirProductosAlContenedor(listaProductos) {
	// Limpiamos contenedor
	limpiarContenedorProductos();

	// Recorremos el array de productos
	for (let producto of listaProductos) {
		// Creación de articulo
		const articulo = document.createElement("article");
		articulo.classList.add("articulos");
		// Agregamos producto correspondiente
		articulo.innerHTML = `<img src=${producto.img} class="articulos__img" />
    <h3 class="articulos__nombre">${producto.nombre}</h3>
    <h3 class="articulos__clasificacion">${producto.categoria}</h3>
    <div class="articulos__botton-precio">
      <h3 class="articulos__precio">$${producto.precio.toLocaleString("en-US", {
				minimumFractionDigits: 2,
			})}</h3>
      <button class="button button__carrito" id="agregarCarrito${producto.id}">
      Agregar al Carrito
      </button>
    </div>`;
		// Agregamos articulo al contenedor
		contenedorArticulos.append(articulo);
	}
}

// Función para limpiar el contenedor de productos
function limpiarContenedorProductos() {
	contenedorArticulos.innerHTML = "";
}
// Función para ordenar lista
function ordenarLista(listaProductos) {}

// Ejecutamos la impresión de los productos
imprimirProductosAlContenedor(productos);

// Array con productos por categoría
const productosEscritorios = productos.filter(
	(producto) => producto.categoria == "Escritorios"
);

const productosEstanterias = productos.filter(
	(producto) => producto.categoria == "Estanterías"
);

const productosHabitacion = productos.filter(
	(producto) => producto.categoria == "Habitación"
);

const productosSillasYSillones = productos.filter(
	(producto) => producto.categoria == "Sillas y Sillones"
);

const productosMesasYRatoneras = productos.filter(
	(producto) => producto.categoria == "Mesas y Ratoneras"
);

// Llamamos a los selectores
// Selector de categorías
const selectorCategorias = document.getElementById("selectorCategorias");
// Evento para cambiar categoría
selectorCategorias.addEventListener("change", (e) => {
	// Seleccionamos la categoria
	const categoriaSeleccionada = e.target.value;
	console.log(categoriaSeleccionada);
	// Imprimimos la categoria seleccionada
	if (categoriaSeleccionada == "none") {
		imprimirProductosAlContenedor(productos);
	} else if (categoriaSeleccionada == "escritorios") {
		imprimirProductosAlContenedor(productosEscritorios);
	} else if (categoriaSeleccionada == "estanterias") {
		imprimirProductosAlContenedor(productosEstanterias);
	} else if (categoriaSeleccionada == "habitacion") {
		imprimirProductosAlContenedor(productosHabitacion);
	} else if (categoriaSeleccionada == "sillasysillones") {
		imprimirProductosAlContenedor(productosSillasYSillones);
	} else if (categoriaSeleccionada == "mesasyratoneras") {
		imprimirProductosAlContenedor(productosMesasYRatoneras);
	}
});

// Selector de orden
const selectorOrden = document.getElementById("selectorOrden");
// Evento para cambiar orden
selectorOrden.addEventListener("change", (e) => {
	// Seleccionamos la categoria
	const ordenSeleccionado = e.target.value;
	console.log(ordenSeleccionado);
	// Imprimimos la categoria seleccionada
	if (ordenSeleccionado == "none") {
		imprimirProductosAlContenedor(productos);
	} else if (ordenSeleccionado == "maM") {
		imprimirProductosAlContenedor(
			productos.sort((a, b) => a.precio - b.precio)
		);
	} else if (ordenSeleccionado == "Mam") {
		imprimirProductosAlContenedor(
			productos.sort((a, b) => b.precio - a.precio)
		);
	}
});
