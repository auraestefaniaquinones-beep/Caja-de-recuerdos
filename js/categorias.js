// categorias.js

/**
 * List of available product categories.
 * Includes a default option "Todas" (All categories).
 */
let categorias = ["Todas", "Libros", "Electrónica", "Ropa"];

/**
 * Saves a new category entered by the user.
 * 
 * This function:
 * - Retrieves the category name from the input field
 * - Validates that it is not empty
 * - Checks if the category already exists
 * - Adds the category to the list and updates the UI
 * 
 * @function guardarCategoria
 */
function guardarCategoria() {
  // Get the value from the input field and remove extra spaces
  const nuevaCat = document.getElementById('nuevaCategoria').value.trim();

  // Validate that the input is not empty
  if (!nuevaCat) {
    return alert('El nombre de la categoría es obligatorio.');
  }

  // Check if the category does not already exist
  if (!categorias.includes(nuevaCat)) {

    // Add the new category to the array
    categorias.push(nuevaCat);

    // Get the category list element from the DOM
    const lista = document.getElementById('listaCategorias');

    // Create a new list item element
    const li = document.createElement('li');
    li.innerText = nuevaCat;

    // Assign click event to filter by this category
    li.onclick = () => filtrar(nuevaCat);

    // Add the new category to the list in the UI
    lista.appendChild(li);

    // Close the category modal
    cerrarModalCategoria();

  } else {
    // Show error if category already exists
    alert('La categoría ya existe.');
  }
}