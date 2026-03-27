// ==========================================================
// APP.JS - Control principal de la aplicación
// Contiene funciones para modales, filtrado, resumen y búsqueda
// ==========================================================

// =====================
// MODALES: Abrir y cerrar ventanas emergentes
// =====================

/**
 * Abre el modal de objeto para agregar uno nuevo.
 * Configura el título y limpia los campos del formulario.
 */
function abrirModalObjeto() {
    document.getElementById('modalObjeto').style.display = 'flex'; // Mostrar modal
    document.getElementById('tituloModal').innerText = 'Agregar Objeto'; // Título
    limpiarCampos(); // Limpiar inputs
}

/**
 * Cierra el modal de objeto.
 */
function cerrarModal() {
    document.getElementById('modalObjeto').style.display = 'none'; // Ocultar modal
}

/**
 * Abre el modal para agregar una nueva categoría.
 */
function abrirModalCategoria() {
    document.getElementById('modalCategoria').style.display = 'flex'; // Mostrar modal
}

/**
 * Cierra el modal de categoría.
 */
function cerrarModalCategoria() {
    document.getElementById('modalCategoria').style.display = 'none'; // Ocultar modal
}

/**
 * Limpia los campos del formulario de agregar/editar objeto.
 */
function limpiarCampos() {
    document.getElementById('nombre').value = '';      // Limpiar nombre
    document.getElementById('categoria').value = '';  // Limpiar categoría
    document.getElementById('info1').value = '';      // Limpiar descripción 1
    document.getElementById('info2').value = '';      // Limpiar descripción 2
    document.getElementById('imagen').value = '';     // Limpiar URL de imagen
}

// =====================
// RESUMEN Y FILTRADO
// =====================

/**
 * Actualiza el resumen de objetos mostrando el total.
 */
function actualizarResumen() {
    document.getElementById('resumen').innerText = `Total objetos: ${objetos.length}`;
}

/**
 * Filtra los objetos por categoría y actualiza la vista en el grid.
 * @param {string} cat - Categoría a filtrar (puede ser "Todas").
 */
function filtrar(cat) {
    const grid = document.getElementById('gridObjetos');
    grid.innerHTML = ''; // Limpiar grid

    objetos
        .filter(obj => cat === 'Todas' || obj.categoria === cat) // Filtrado por categoría
        .forEach((obj, index) => {
            // Crear tarjeta del objeto
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${obj.imagen || 'https://via.placeholder.com/150'}" alt="${obj.nombre}">
                <h4>${obj.nombre}</h4>
                <p>${obj.categoria}</p>
                <div class="acciones">
                  <button onclick="verDetalle(${index})">Ver</button>
                  <button onclick="editarObjeto(${index})">Editar</button>
                  <button onclick="eliminarObjeto(${index})">Eliminar</button>
                </div>
            `;
            grid.appendChild(card); // Agregar tarjeta al grid
        });

    actualizarResumen(); // Actualizar total de objetos
}

// =====================
// BUSCADOR
// =====================

/**
 * Filtra los objetos por texto ingresado en el buscador.
 */
function buscarObjeto() {
    const texto = document.getElementById('buscador').value.toLowerCase(); // Obtener texto
    const grid = document.getElementById('gridObjetos');
    grid.innerHTML = ''; // Limpiar grid

    objetos
        .filter(obj => obj.nombre.toLowerCase().includes(texto)) // Filtrar por nombre
        .forEach((obj, index) => {
            // Crear tarjeta del objeto
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${obj.imagen || 'https://via.placeholder.com/150'}" alt="${obj.nombre}">
                <h4>${obj.nombre}</h4>
                <p>${obj.categoria}</p>
                <div class="acciones">
                  <button onclick="verDetalle(${index})">Ver</button>
                  <button onclick="editarObjeto(${index})">Editar</button>
                  <button onclick="eliminarObjeto(${index})">Eliminar</button>
                </div>
            `;
            grid.appendChild(card); // Agregar tarjeta al grid
        });

    actualizarResumen(); // Actualizar total de objetos
}

// =====================
// INICIALIZAR AL CARGAR LA PÁGINA
// =====================

/**
 * Se ejecuta cuando el DOM está cargado.
 * Inicializa la aplicación cargando datos del storage y mostrando los objetos.
 */
document.addEventListener('DOMContentLoaded', () => {
    cargarStorage();   // Cargar datos desde almacenamiento local (si existen)
    mostrarObjetos();  // Mostrar objetos en el grid
});