// categorias.js

let categorias = ["Todas", "Libros", "Electrónica", "Ropa"];

// Guardar Categoría
function guardarCategoria() {
  const nuevaCat = document.getElementById('nuevaCategoria').value.trim();
  if (!nuevaCat) return alert('El nombre de la categoría es obligatorio.');
  if (!categorias.includes(nuevaCat)) {
    categorias.push(nuevaCat);
    const lista = document.getElementById('listaCategorias');
    const li = document.createElement('li');
    li.innerText = nuevaCat;
    li.onclick = () => filtrar(nuevaCat);
    lista.appendChild(li);
    cerrarModalCategoria();
  } else {
    alert('La categoría ya existe.');
  }
}
