"use client";

import { useState, useEffect } from "react";

// URL base para las solicitudes a la API
const API_BASE_URL = 'https://bildy-rpmaya.koyeb.app';

/**
 * Hook personalizado para realizar solicitudes de datos a la API.
 * Gestiona automáticamente los estados de carga, error y datos obtenidos.
 *
 * @param {string} endpoint - Ruta relativa del endpoint a consultar.
 * @returns {object} - Objeto con los datos obtenidos, el estado de carga y el posible error.
 */
const useFetchData = (endpoint) => {
    // Estado para almacenar los datos obtenidos de la API
    const [data, setData] = useState([]);
    // Estado para indicar si la solicitud está en progreso
    const [loading, setLoading] = useState(true);
    // Estado para almacenar cualquier error que ocurra durante la solicitud
    const [error, setError] = useState(null);

    // Hook useEffect para realizar la solicitud a la API cuando el endpoint cambia
    useEffect(() => {
        // Función asíncrona para realizar la solicitud de datos
        const fetchData = async () => {
            setLoading(true); // Indicar que la carga está en progreso
            try {
                // Obtener el token JWT del almacenamiento local si está disponible
                const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

                // Configurar los encabezados de la solicitud
                const headers = {
                    "Content-Type": "application/json", // Tipo de contenido esperado en la solicitud
                    ...(token && { Authorization: `Bearer ${token}` }), // Incluir token JWT si está disponible
                };

                // Realizar la solicitud a la API
                const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });

                // Verificar si la respuesta fue exitosa
                if (!response.ok) {
                    // Si no fue exitosa, lanzar un error con el código de estado
                    throw new Error(`Error al obtener los datos: ${response.status}`);
                }

                // Convertir la respuesta en un objeto JSON
                const result = await response.json();
                setData(result); // Guardar los datos en el estado
            } catch (err) {
                // Manejar errores durante la solicitud y guardarlos en el estado
                setError(err.message);
                console.error(err); // Mostrar el error en la consola
            } finally {
                // Indicar que la carga ha finalizado
                setLoading(false);
            }
        };

        fetchData(); // Llamar a la función fetchData para obtener los datos
    }, [endpoint]); // Ejecutar useEffect cada vez que el endpoint cambie

    // Retornar los datos, el estado de carga y el posible error
    return { data, loading, error };
};

export default useFetchData; // Exportar el hook para ser usado en otros componentes
