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

// Ejecutamos la impresión de los productos
imprimirProductosAlContenedor(productos);
