// Declarar las variables necesarias
let nombreamigo = [];
let intentos = 0;

// Obtener los elementos del DOM
let itemInput = document.getElementById("amigo");
let divListas = document.querySelector(".listas");
let listaNombre = document.getElementById("listaAmigos");
let resultado = document.getElementById("resultado");
let reinicia = document.getElementById("reiniciar");
let sortea = document.getElementById("sortear");
let agregar = document.getElementById("agregar");
let mensajeError = document.getElementById("mensajeError"); // Elemento para mostrar mensajes de error

// Ocultar botón de reiniciar y mensaje de error inicialmente
reinicia.style.visibility = "hidden";
sortea.setAttribute("disabled", true);
mensajeError.style.display = "none";

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.style.display = "block";
    setTimeout(() => {
        mensajeError.style.display = "none";
    }, 3000); // Eliminar el mensaje después de 3 segundos
}

// Función para limpiar el input
function limpiarCaja(elemento) {
    elemento.value = "";
}

// Función para agregar un item a la lista
function agregarItem(elemento, lista) {
    let listItem = document.createElement("li");
    let uniqueId = Date.now(); // Generar un ID único
    listItem.id = uniqueId;
    listItem.style.display = "flex";
    listItem.style.justifyContent = "space-between";
    listItem.style.alignItems = "center";

    let span = document.createElement("span");
    span.textContent = elemento;

    let button = document.createElement("button");
    button.textContent = "x";
    button.style.marginLeft = "10px";
    button.style.padding = "2px 5px";
    button.style.fontSize = "0.8em";
    button.setAttribute("aria-label", `Eliminar ${elemento}`);
    button.onclick = function () {
        eliminaNombre(uniqueId);
    };

    listItem.appendChild(span);
    listItem.appendChild(button);
    lista.appendChild(listItem);
}

// Función para agregar nombre de los amigos
function agregarAmigo() {
    let nombre = itemInput.value.trim();
    if (nombre === "") {
        mostrarError("¡Error! El nombre no puede estar vacío.");
        return;
    }
    if (nombreamigo.includes(nombre)) {
        mostrarError("¡Error! Ese nombre ya está en la lista.");
        return;
    }
    nombreamigo.push(nombre);
    agregarItem(nombre, listaNombre);
    limpiarCaja(itemInput);

    intentos++;
    if (intentos >= 1 && nombreamigo.length > 0) {
        sortea.removeAttribute("disabled");
    }
}

// Función para realizar el sorteo aleatorio
function sortearAmigo() {
    if (nombreamigo.length === 0) {
        mostrarError("¡No hay amigos en la lista para realizar el sorteo!");
        return;
    }
    eliminarElemento(listaNombre);
    let posicionAleatoria = Math.floor(Math.random() * nombreamigo.length);
    agregarItem(nombreamigo[posicionAleatoria], resultado);
    reinicia.style.visibility = "visible";
    sortea.style.visibility = "hidden";
}

// Función para eliminar un elemento del DOM
function eliminarElemento(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

// Función para eliminar un nombre de la lista
function eliminaNombre(uniqueId) {
    // Mostrar el cuadro de confirmación
    let validar = confirm("¿Estás seguro de eliminar este nombre?");
    if (validar) { // Solo procede si el usuario confirma
        const etiqueta = document.getElementById(uniqueId); // Buscar el elemento en el DOM por ID
        if (etiqueta) {
            // Obtener el nombre del elemento eliminado
            let nombreEliminado = etiqueta.querySelector("span").textContent;
            etiqueta.remove(); // Eliminar el elemento del DOM

            // Eliminar el nombre correspondiente del array
            nombreamigo = nombreamigo.filter(nombre => nombre !== nombreEliminado);
        }
        alert("¡El nombre ha sido eliminado con éxito!"); // Mostrar un mensaje de éxito
    }
    // Si la lista queda vacía, deshabilitar el botón de sorteo
    if (nombreamigo.length === 0) {
        sortea.setAttribute("disabled", true);

    }
}


// Función para reiniciar la aplicación sin recargar la página
function inicia() {
    reinicia.style.visibility = "hidden";
    nombreamigo = [];
    eliminarElemento(listaNombre);
    eliminarElemento(resultado);
    sortea.style.visibility = "visible";
    sortea.setAttribute("disabled", true);
}

// Añadir event listeners a los botones
agregar.addEventListener("click", agregarAmigo);
sortea.addEventListener("click", sortearAmigo);
reinicia.addEventListener("click", inicia);
