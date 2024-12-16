// src/utils/helpers.js
export const handleApiError = (error) => {
    console.error('Error en la API:', error);
    alert('Hubo un error al realizar la operación. Por favor, inténtalo de nuevo.');
};
