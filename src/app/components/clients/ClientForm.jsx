"use client";

import { useRouter } from "next/navigation"; // Importar useRouter para manejar redirecciones y actualizaciones de la página
import useHandleForm from "@/app/hooks/useHandleForm"; // Hook personalizado para manejar formularios con validación
import { ClientSchema } from "@/app/utils/validator"; // Esquema de validación para los datos del cliente
import { handleApiError } from "@/app/utils/helpers"; // Función para manejar errores en las solicitudes API
import { apiRequest } from "@/app/utils/api"; // Función genérica para realizar solicitudes a la API
import { useState } from "react"; // Hook de React para manejar estado

const ClientForm = () => {
    const [file, setFile] = useState(null); // Estado para manejar el archivo del logo cargado por el usuario
    const router = useRouter(); // Inicializar router para redirecciones o actualizaciones automáticas

    // Configurar el formulario con validación y el manejador de envío
    const { register, handleSubmit, errors, onSubmit } = useHandleForm(
        ClientSchema, // Esquema de validación para los datos del cliente
        async (data) => {
            try {
                // 1. Crear cliente en la base de datos
                const clientResponse = await apiRequest("/api/client", "POST", data); // Enviar datos del cliente a la API
                console.log("Cliente añadido con éxito", clientResponse);

                // 2. Subir el logo del cliente (si se cargó un archivo)
                if (file && clientResponse?._id) {
                    const formData = new FormData();
                    formData.append("image", file); // Añadir el archivo al FormData

                    try {
                        await apiRequest(`/api/client/logo/${clientResponse._id}`, "PATCH", formData, true); // Subir el archivo a la API
                        console.log("Imagen subida con éxito");
                    } catch (uploadError) {
                        console.error(uploadError);

                        // Si la subida del logo falla, elimina el cliente creado
                        await apiRequest(`/api/client/${clientResponse._id}`, "DELETE");
                        console.log("Cliente eliminado debido a un error al subir la imagen");
                        throw new Error("Error al subir la imagen, el cliente ha sido eliminado.");
                    }
                }

                // 3. Refrescar la página para mostrar el cliente añadido
                router.refresh();

                // 4. Mostrar mensaje de éxito al usuario
                alert("Cliente añadido con éxito");
            } catch (error) {
                // Manejar cualquier error durante la creación del cliente
                handleApiError(error);
            }
        }
    );

    // Renderizar el formulario
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Añadir Cliente</h2>

            {/* Campo para el nombre del cliente */}
            <div>
                <input
                    {...register("name")} // Registrar este campo para la validación
                    placeholder="Nombre del cliente"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>} {/* Mostrar errores de validación */}
            </div>

            {/* Campo para el CIF del cliente */}
            <div>
                <input
                    {...register("cif")}
                    placeholder="CIF del cliente"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.cif && <p className="text-red-500">{errors.cif.message}</p>}
            </div>

            <h3 className="text-xl font-semibold mt-4">Dirección</h3>

            {/* Campos para la dirección del cliente */}
            <div>
                <input
                    {...register("address.street")}
                    placeholder="Calle"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.street && <p className="text-red-500">{errors.address.street.message}</p>}
            </div>
            <div>
                <input
                    type="number"
                    {...register("address.number")}
                    placeholder="Número"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.number && <p className="text-red-500">{errors.address.number.message}</p>}
            </div>
            <div>
                <input
                    type="number"
                    {...register("address.postal")}
                    placeholder="Código Postal"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.postal && <p className="text-red-500">{errors.address.postal.message}</p>}
            </div>
            <div>
                <input
                    {...register("address.city")}
                    placeholder="Ciudad"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.city && <p className="text-red-500">{errors.address.city.message}</p>}
            </div>
            <div>
                <input
                    {...register("address.province")}
                    placeholder="Provincia"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.province && <p className="text-red-500">{errors.address.province.message}</p>}
            </div>

            {/* Campo para subir el logo del cliente */}
            <div>
                <label htmlFor="logo" className="block font-medium mb-2">Logo del Cliente:</label>
                <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])} // Actualizar el estado con el archivo cargado
                    className="w-full p-2 border rounded-lg"
                />
            </div>

            {/* Botón para enviar el formulario */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
            >
                Añadir Cliente
            </button>
        </form>
    );
};

export default ClientForm;
