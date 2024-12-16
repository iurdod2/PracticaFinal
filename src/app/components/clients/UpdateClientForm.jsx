"use client";

import { useState } from "react"; // Hook de React para manejar estado
import { useRouter } from "next/navigation"; // Hook para manejar navegación y actualizaciones de página
import useHandleForm from "@/app/hooks/useHandleForm"; // Hook personalizado para manejar formularios con validación
import { ClientSchema } from "@/app/utils/validator"; // Esquema de validación para los datos del cliente
import { handleApiError } from "@/app/utils/helpers"; // Función para manejar errores en las solicitudes API
import { updateClient } from "@/app/services/clientService"; // Servicio para realizar la solicitud de actualización
import { apiRequest } from "@/app/utils/api"; // Función genérica para realizar solicitudes a la API

const UpdateClientForm = ({ client, onSuccess }) => {
    const router = useRouter(); // Inicializar router para redirecciones o actualizaciones automáticas
    const [file, setFile] = useState(null); // Estado para manejar el archivo del logo cargado por el usuario

    // Configurar el formulario con validación y el manejador de envío
    const { register, handleSubmit, errors, onSubmit } = useHandleForm(
        ClientSchema, // Esquema de validación para los datos del cliente
        async (data) => {
            try {
                // Preparar los datos actualizados del cliente
                const updatedData = {
                    name: data.name || client.name, // Usar el valor del formulario o mantener el existente
                    cif: data.cif || client.cif,
                    address: {
                        street: data.address?.street || client.address?.street,
                        number: data.address?.number || client.address?.number,
                        postal: data.address?.postal || client.address?.postal,
                        city: data.address?.city || client.address?.city,
                        province: data.address?.province || client.address?.province,
                    },
                };

                // 1. Actualizar los datos del cliente
                await updateClient(client._id, updatedData);

                // 2. Subir el logo si se seleccionó un archivo
                if (file) {
                    const formData = new FormData();
                    formData.append("image", file); // Añadir el archivo al FormData
                    await apiRequest(`/api/client/logo/${client._id}`, "PATCH", formData, true); // Subir el archivo a la API
                }

                // 3. Refrescar la página o lista de clientes tras la actualización
                if (onSuccess) {
                    onSuccess(); // Notificar éxito al componente padre
                } else {
                    router.refresh(); // Refrescar la página si no hay un manejador `onSuccess`
                }

                // Mostrar un mensaje de éxito
                alert("Cliente actualizado con éxito");
            } catch (error) {
                // Manejar errores durante la actualización
                handleApiError(error);
            }
        }
    );

    // Renderizar el formulario
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Actualizar Cliente</h2>
            
            {/* Campo: Nombre */}
            <div>
                <label className="block font-medium mb-2">Nombre del Cliente:</label>
                <input
                    {...register("name")} // Registrar este campo para la validación
                    defaultValue={client.name} // Mostrar el valor actual del cliente
                    placeholder="Nombre del cliente"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>} {/* Mostrar errores de validación */}
            </div>

            {/* Campo: CIF */}
            <div>
                <label className="block font-medium mb-2">CIF:</label>
                <input
                    {...register("cif")}
                    defaultValue={client.cif}
                    placeholder="CIF del cliente"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.cif && <p className="text-red-500">{errors.cif.message}</p>}
            </div>

            {/* Dirección */}
            <h3 className="text-xl font-semibold mt-4">Dirección</h3>
            
            {/* Campos para los detalles de la dirección */}
            <div>
                <label className="block font-medium mb-2">Calle:</label>
                <input
                    {...register("address.street")}
                    defaultValue={client.address?.street}
                    placeholder="Calle"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.street && <p className="text-red-500">{errors.address.street.message}</p>}
            </div>
            <div>
                <label className="block font-medium mb-2">Número:</label>
                <input
                    type="number"
                    {...register("address.number")}
                    defaultValue={client.address?.number}
                    placeholder="Número"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.number && <p className="text-red-500">{errors.address.number.message}</p>}
            </div>
            <div>
                <label className="block font-medium mb-2">Código Postal:</label>
                <input
                    type="number"
                    {...register("address.postal")}
                    defaultValue={client.address?.postal}
                    placeholder="Código Postal"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.postal && <p className="text-red-500">{errors.address.postal.message}</p>}
            </div>
            <div>
                <label className="block font-medium mb-2">Ciudad:</label>
                <input
                    {...register("address.city")}
                    defaultValue={client.address?.city}
                    placeholder="Ciudad"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.city && <p className="text-red-500">{errors.address.city.message}</p>}
            </div>
            <div>
                <label className="block font-medium mb-2">Provincia:</label>
                <input
                    {...register("address.province")}
                    defaultValue={client.address?.province}
                    placeholder="Provincia"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.province && <p className="text-red-500">{errors.address.province.message}</p>}
            </div>

            {/* Campo: Logo */}
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

            {/* Botón de actualización */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Actualizar Cliente
            </button>
        </form>
    );
};

export default UpdateClientForm;
