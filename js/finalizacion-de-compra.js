const paginaPrincipal = document.getElementById("paginaPrincipal");
const seguirComprando = document.getElementById("seguirComprando");

paginaPrincipal.addEventListener("click", () => {
	location.href = "../index.html";
});

seguirComprando.addEventListener("click", () => {
	location.href = "./productos.html";
});
