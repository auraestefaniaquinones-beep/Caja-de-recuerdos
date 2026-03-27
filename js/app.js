// app.js

// =====================
// Modales
// =====================
function abrirModalObjeto() {
    document.getElementById('modalObjeto').style.display = 'flex';
    document.getElementById('tituloModal').innerText = 'Agregar Objeto';
    limpiarCampos();
}

function cerrarModal() {
    document.getElementById('modalObjeto').style.display = 'none';
}

function abrirModalCategoria() {
    document.getElementById('modalCategoria').style.display = 'flex';
}

function cerrarModalCategoria() {
    document.getElementById('modalCategoria').style.display = 'none';
}

function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('info1').value = '';
    document.getElementById('info2').value = '';
    document.getElementById('imagen').value = '';
}

// =====================
// Resumen y filtrado
// =====================
function actualizarResumen() {
    document.getElementById('resumen').innerText = `Total objetos: ${objetos.length}`;
}

function filtrar(cat) {
    const grid = document.getElementById('gridObjetos');
    grid.innerHTML = '';
    objetos
        .filter(obj => cat === 'Todas' || obj.categoria === cat)
        .forEach((obj, index) => {
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
            grid.appendChild(card);
        });
    actualizarResumen();
}

// =====================
// Buscador
// =====================
function buscarObjeto() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const grid = document.getElementById('gridObjetos');
    grid.innerHTML = '';

    objetos
        .filter(obj => obj.nombre.toLowerCase().includes(texto))
        .forEach((obj, index) => {
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
            grid.appendChild(card);
        });
    actualizarResumen();
}

// =====================
// Inicializar al cargar
// =====================
document.addEventListener('DOMContentLoaded', () => {
    cargarStorage(); // Cargar datos si usan storage
    mostrarObjetos();
});
