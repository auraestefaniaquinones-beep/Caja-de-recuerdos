// ==========================================================
// STORAGE.JS - Manejo de almacenamiento local (localStorage)
// ==========================================================

// ==============================
// Constantes de keys para localStorage
// ==============================
const STORAGE_KEYS = {
  OBJETOS: 'objetos',      // Key para guardar los objetos
  CATEGORIAS: 'categorias' // Key para guardar las categorías
};

// ==============================
// FUNCIONES DE ALMACENAMIENTO
// ==============================

/**
 * Lee un valor desde localStorage de forma segura.
 * Si el valor no existe o hay error, devuelve el valor por defecto.
 * @param {string} key - Clave en localStorage
 * @param {*} defaultValue - Valor por defecto si no existe la key
 * @returns {*} - Valor parseado desde JSON o defaultValue
 */
function leerStorage(key, defaultValue) {
  try {
    const data = localStorage.getItem(key); // Obtener datos de localStorage
    return data ? JSON.parse(data) : defaultValue; // Parsear JSON o retornar default
  } catch (error) {
    console.error(`Error leyendo ${key}:`, error);
    return defaultValue;
  }
}

/**
 * Guarda un valor en localStorage.
 * Convierte el valor a JSON antes de guardar.
 * @param {string} key - Clave donde guardar el valor
 * @param {*} value - Valor a guardar
 */
function escribirStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value)); // Guardar JSON en localStorage
  } catch (error) {
    console.error(`Error guardando ${key}:`, error);
  }
}

// ==============================
// API PÚBLICA: Cargar y guardar todos los datos
// ==============================

/**
 * Carga todos los datos de objetos y categorías desde localStorage.
 * Si no existen, inicializa con valores por defecto.
 */
function cargarStorage() {
  objetos = leerStorage(STORAGE_KEYS.OBJETOS, []); // Cargar objetos o lista vacía
  categorias = leerStorage(STORAGE_KEYS.CATEGORIAS, ["Todas", "Libros", "Electrónica", "Ropa"]); // Cargar categorías por defecto
}

/**
 * Guarda todos los datos actuales de objetos y categorías en localStorage.
 */
function guardarStorage() {
  escribirStorage(STORAGE_KEYS.OBJETOS, objetos);       // Guardar objetos
  escribirStorage(STORAGE_KEYS.CATEGORIAS, categorias); // Guardar categorías
}

// ==============================
// SINCRONIZACIÓN AUTOMÁTICA
// ==============================

/**
 * Función de sincronización automática.
 * Llama a guardarStorage para mantener los cambios en localStorage.
 */
function syncStorage() {
  guardarStorage();
}