// Finalizar Compra
finalizarCompra.addEventListener("click", eliminarProductosDelCarrito);
// eliminar todos los productos del carrito
function eliminarProductosDelCarrito() {
	localStorage.removeItem("carrito");
	location.href = "./fin_de_compra.html";
}
