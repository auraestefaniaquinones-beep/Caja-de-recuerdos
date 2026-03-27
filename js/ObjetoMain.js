// objetos.js

/**
 * stores all the objects created by the user
 * Estoy almacenando todos los objetos
 */
let objetos = [];

/**
 * stores the id of the object being edited
 * Estoy almacenando el objeto que se está editando
 */
let editingObjectId = null;

/**
 * This function validates the object data
 * @param nombre the name of the object
 * Estoy documentando el nombre
 * @param categoria the category of the object
 * Estoy documentando la categoría
 * @return true if the data is valid, false otherwise
 * Estoy documentando el retorno de la validación
 */
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

/**
 * This function saves a new object or updates an existing one
 * Estoy documentando la función de guardar o editar
 */
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

/**
 * This function displays all objects on the screen
 * Estoy mostrando los objetos en la interfaz
 */
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

/**
 * This function loads the object data into the form for editing
 * @param index the position of the object in the list
 * Estoy documentando el índice del objeto
 */
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

/**
 * This function deletes an object from the list
 * @param index the position of the object to delete
 * Estoy documentando el índice del objeto a eliminar
 */
// Eliminar objeto
function eliminarObjeto(index) {
    if (confirm('¿Deseas eliminar este objeto?')) {
        objetos.splice(index, 1);
        mostrarObjetos();
    }
}

/**
 * This function shows the detail of a selected object
 * @param index the position of the object
 * Estoy documentando el índice del objeto a visualizar
 */
// Ver detalle
function verDetalle(index) {
    const obj = objetos[index];
    document.getElementById('detalleNombre').innerText = obj.nombre;
    document.getElementById('detalleImg').src = obj.imagen || 'https://via.placeholder.com/150';
    document.getElementById('detalleInfo1').innerText = obj.info1;
    document.getElementById('detalleInfo2').innerText = obj.info2;
    document.getElementById('modalDetalle').style.display = 'flex';
}

/**
 * This function closes the detail modal
 * Estoy documentando el cierre del modal
 */
function cerrarDetalle() {
    document.getElementById('modalDetalle').style.display = 'none';
}
