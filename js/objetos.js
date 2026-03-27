// objetos.js

let objetos = [];
let editingObjectId = null;

// Validación
function validarObjeto(nombre, categoria) {
  if (!nombre.trim()) {
    alert('El nombre es obligatorio.');
    return false;
  }
  if (!categoria.trim()) {
    alert('La categoría es obligatoria.');
    return false;
  }
  return true;
}

// Guardar Objeto
function guardarObjeto() {
  const nombre = document.getElementById('nombre').value;
  const categoria = document.getElementById('categoria').value;
  const info1 = document.getElementById('info1').value;
  const info2 = document.getElementById('info2').value;
  const imagen = document.getElementById('imagen').value;

  if (!validarObjeto(nombre, categoria)) return;

  if (editingObjectId !== null) {
    objetos[editingObjectId] = { nombre, categoria, info1, info2, imagen };
    editingObjectId = null;
  } else {
    objetos.push({ nombre, categoria, info1, info2, imagen });
  }

  cerrarModal();
  mostrarObjetos();
}

// Mostrar objetos
function mostrarObjetos() {
  const grid = document.getElementById('gridObjetos');
  grid.innerHTML = '';
  objetos.forEach((obj, index) => {
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

// Editar objeto
function editarObjeto(index) {
  editingObjectId = index;
  const obj = objetos[index];
  abrirModalObjeto();
  document.getElementById('tituloModal').innerText = 'Editar Objeto';
  document.getElementById('nombre').value = obj.nombre;
  document.getElementById('categoria').value = obj.categoria;
  document.getElementById('info1').value = obj.info1;
  document.getElementById('info2').value = obj.info2;
  document.getElementById('imagen').value = obj.imagen;
}

// Eliminar objeto
function eliminarObjeto(index) {
  if (confirm('¿Deseas eliminar este objeto?')) {
    objetos.splice(index, 1);
    mostrarObjetos();
  }
}

// Ver detalle
function verDetalle(index) {
  const obj = objetos[index];
  document.getElementById('detalleNombre').innerText = obj.nombre;
  document.getElementById('detalleImg').src = obj.imagen || 'https://via.placeholder.com/150';
  document.getElementById('detalleInfo1').innerText = obj.info1;
  document.getElementById('detalleInfo2').innerText = obj.info2;
  document.getElementById('modalDetalle').style.display = 'flex';
}

function cerrarDetalle() {
  document.getElementById('modalDetalle').style.display = 'none';
}
