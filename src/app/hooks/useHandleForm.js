"use client";

import { useForm } from "react-hook-form"; // Hook para manejar formularios
import { yupResolver } from "@hookform/resolvers/yup"; // Resolver para validar con Yup

/**
 * Hook personalizado para manejar formularios utilizando react-hook-form y Yup para validación.
 *
 * @param {object} schema - Esquema de validación de Yup para el formulario.
 * @param {function} onSubmitHandler - Función que se ejecutará al enviar el formulario.
 * @returns {object} - Contiene funciones y estados relacionados con el manejo del formulario.
 */
const useHandleForm = (schema, onSubmitHandler) => {
    // Inicializar react-hook-form con validación de Yup
    const {
        register, // Función para registrar campos del formulario
        handleSubmit, // Función para manejar el envío del formulario
        reset, // Función para reiniciar el formulario
        formState: { errors }, // Objeto que contiene los errores de validación
    } = useForm({
        resolver: yupResolver(schema), // Resolver de Yup para manejar la validación
    });

    /**
     * Función que se ejecuta al enviar el formulario.
     * 
     * @param {object} data - Datos capturados del formulario.
     */
    const onSubmit = async (data) => {
        await onSubmitHandler(data); // Llama a la función proporcionada con los datos del formulario
        reset(); // Reinicia los campos del formulario
    };

    // Retornar las funciones y estados necesarios para manejar el formulario
    return { register, handleSubmit, errors, onSubmit };
};

export default useHandleForm; // Exportar el hook personalizado
