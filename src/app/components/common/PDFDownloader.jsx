"use client";

import PropTypes from "prop-types"; // Biblioteca para la validación de tipos de propiedades

// Base URL de la API
const API_BASE_URL = "https://bildy-rpmaya.koyeb.app";

const PDFDownloader = ({ id, filename, buttonLabel = "Descargar PDF" }) => {
    // Validación inicial: Si no hay un ID válido, mostrar un error en la consola y no renderizar el botón
    if (!id) {
        console.error("El ID no está definido. Asegúrate de pasar un ID válido.");
        return null;
    }

    // Función para manejar la descarga del PDF
    const handleDownload = async () => {
        try {
            // Realizar la solicitud para descargar el PDF asociado al ID
            const response = await fetch(`${API_BASE_URL}/api/deliverynote/pdf/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Enviar token JWT para autenticación
                },
            });

            // Comprobar si la solicitud fue exitosa
            if (!response.ok) {
                throw new Error("Error al descargar el archivo");
            }

            // Convertir la respuesta en un blob para manejar el archivo
            const blob = await response.blob();

            // Crear una URL temporal para el archivo descargado
            const downloadUrl = window.URL.createObjectURL(blob);

            // Crear dinámicamente un enlace (<a>) para descargar el archivo
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = filename; // Nombre del archivo al descargar
            document.body.appendChild(link); // Añadir el enlace al DOM temporalmente
            link.click(); // Simular un clic para iniciar la descarga
            document.body.removeChild(link); // Eliminar el enlace después de usarlo
        } catch (error) {
            // Manejar errores en la descarga y mostrar un mensaje al usuario
            console.error("Error descargando el archivo:", error);
            alert("Hubo un problema al descargar el archivo.");
        }
    };

    return (
        // Botón que activa la descarga al hacer clic
        <button
            onClick={handleDownload} // Llamar a la función de descarga
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white"
        >
            {buttonLabel} {/* Etiqueta del botón, configurable */}
        </button>
    );
};

// Validación de las propiedades que recibe el componente
PDFDownloader.propTypes = {
    id: PropTypes.string.isRequired, // ID del albarán para descargar el PDF
    filename: PropTypes.string.isRequired, // Nombre del archivo al guardar
    buttonLabel: PropTypes.string, // Etiqueta opcional para el botón
};

export default PDFDownloader;
