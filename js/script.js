const contenedorArticulos = document.getElementById("productosHtml");

// Ejecutamos la impresión de los productos
imprimirProductosAlContenedor(productos);

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
let carrito;
if (localStorage.getItem("carrito") != null) {
	carrito = JSON.parse(localStorage.getItem("carrito"));

	// Actualizamos tabla
	for (let producto of carrito) {
		imprimirCarrito(producto);
	}
} else {
	carrito = [];
}

// Agregar al carrito
function agregarAlCarrito(productoAAgregar) {
	// Alert para avisar de la carga del producto
	alert(`El producto ${productoAAgregar.nombre} ha sido agregado al Carrito`);
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

	// Guardamos producto seleccionado en el storage
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

function imprimirCarrito(productoAAgregar) {
	document.querySelector("#productosPrecarrito").innerHTML += `
  <td>
    <div class="precart-flex">
      <img src="${productoAAgregar.img}" alt="${
		productoAAgregar.nombre
	}" class="carrito__img marg-precart"/>
      <span class="marg-precart">${productoAAgregar.nombre}</span>
    </div>
  </td>
  <td>
    $${productoAAgregar.precio.toLocaleString("en-US", {
			minimumFractionDigits: 2,
		})}
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
// Función para ordenar lista *agregar después del json*
// function ordenarLista(listaProductos) {}

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
		sessionStorage.setItem("estadoCarga", "productos");
	} else if (categoriaSeleccionada == "escritorios") {
		imprimirProductosAlContenedor(productosEscritorios);
		sessionStorage.setItem("estadoCarga", "productosEscritorios");
	} else if (categoriaSeleccionada == "estanterias") {
		imprimirProductosAlContenedor(productosEstanterias);
		sessionStorage.setItem("estadoCarga", "productosEstanterias");
	} else if (categoriaSeleccionada == "habitacion") {
		imprimirProductosAlContenedor(productosHabitacion);
		sessionStorage.setItem("estadoCarga", "productosHabitacion");
	} else if (categoriaSeleccionada == "sillasysillones") {
		imprimirProductosAlContenedor(productosSillasYSillones);
		sessionStorage.setItem("estadoCarga", "productosSillasYSillones");
	} else if (categoriaSeleccionada == "mesasyratoneras") {
		imprimirProductosAlContenedor(productosMesasYRatoneras);
		sessionStorage.setItem("estadoCarga", "productosMesasYRatoneras");
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
	if (ordenSeleccionado == "maM") {
		imprimirProductosAlContenedor(
			productos.sort((a, b) => a.precio - b.precio)
		);
	} else if (ordenSeleccionado == "Mam") {
		imprimirProductosAlContenedor(
			productos.sort((a, b) => b.precio - a.precio)
		);
	}
});
