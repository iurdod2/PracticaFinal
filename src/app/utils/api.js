// URL base de la API
const API_BASE_URL = 'https://bildy-rpmaya.koyeb.app';

/**
 * Función genérica para realizar solicitudes a la API.
 *
 * @param {string} url - Endpoint relativo de la API.
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE, etc.).
 * @param {object|FormData} data - Datos enviados en la solicitud (puede ser un objeto JSON o FormData).
 * @returns {Promise<object>} - Respuesta de la API en formato JSON.
 */
export const apiRequest = async (url, method, data) => {
    try {
        // Recuperar el token JWT del almacenamiento local
        const token = localStorage.getItem("jwt");
        console.log("Este es el token recuperado: ", token);

        // Configurar los encabezados de la solicitud
        const headers = data instanceof FormData
            ? { Authorization: `Bearer ${token}` } // Sin "Content-Type" para manejar FormData
            : {
                  "Content-Type": "application/json", // Encabezado necesario para solicitudes JSON
                  ...(token && { Authorization: `Bearer ${token}` }), // Incluir token JWT si está disponible
              };

        // Realizar la solicitud a la API
        const response = await fetch(`${API_BASE_URL}${url}`, {
            method, // Método HTTP (e.g., GET, POST)
            headers, // Encabezados configurados
            body: data instanceof FormData ? data : JSON.stringify(data), // Cuerpo de la solicitud
        });

        // Manejar respuestas no exitosas
        if (!response.ok) {
            // Leer el cuerpo de la respuesta para obtener detalles del error
            const errorData = await response.text();
            throw new Error(errorData || `HTTP error! status: ${response.status}`);
        }

        // Retornar el resultado en formato JSON
        return await response.json();
    } catch (error) {
        // Manejo de errores durante la solicitud
        console.error("Error en la solicitud API:", error);
        throw error; // Propagar el error para que lo maneje quien llama a la función
    }
};
