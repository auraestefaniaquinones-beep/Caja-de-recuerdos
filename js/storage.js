// storage.js

const STORAGE_KEYS = {
  OBJETOS: 'objetos',
  CATEGORIAS: 'categorias'
};

// ==============================
// UTILIDADES INTERNAS (privadas)
// ==============================

// Leer del localStorage de forma segura
function leerStorage(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error leyendo ${key}:`, error);
    return defaultValue;
  }
}

// Escribir en localStorage de forma segura
function escribirStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error guardando ${key}:`, error);
  }
}

// ==============================
// API PÚBLICA (responsabilidad)
// ==============================

// Cargar todos los datos
function cargarStorage() {
  objetos = leerStorage(STORAGE_KEYS.OBJETOS, []);
  categorias = leerStorage(STORAGE_KEYS.CATEGORIAS, ["Todas", "Libros", "Electrónica", "Ropa"]);
}

// Guardar todos los datos
function guardarStorage() {
  escribirStorage(STORAGE_KEYS.OBJETOS, objetos);
  escribirStorage(STORAGE_KEYS.CATEGORIAS, categorias);
}

// ==============================
// HELPERS (DRY)
// ==============================

// Guardar automáticamente después de cambios
function syncStorage() {
  guardarStorage();
}