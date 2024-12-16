"use client";

import useFetchData from "@/app/hooks/useFetchData"; // Hook para obtener datos de la API
import { apiRequest } from "@/app/utils/api"; // Función genérica para realizar solicitudes API
import Link from "next/link"; // Componente para enlaces en Next.js
import { useState } from "react"; // Hook de React para manejar estado
import { useRouter } from "next/navigation"; // Hook para manejar navegación y actualizaciones de página
import UpdateClientForm from "@/app/components/clients/UpdateClientForm"; // Componente para actualizar clientes

const ClientList = () => {
    const router = useRouter(); // Inicializar router para manejar redirecciones y actualizaciones
    const { data: clients, loading, error } = useFetchData("/api/client"); // Obtener lista de clientes desde la API
    const [selectedClient, setSelectedClient] = useState(null); // Estado para manejar el cliente seleccionado para actualizar

    // Función para manejar la eliminación de un cliente
    const handleDelete = async (clientId) => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este cliente?"); // Confirmar eliminación
        if (!confirmDelete) return;

        try {
            // Solicitud para eliminar el cliente por ID
            await apiRequest(`/api/client/${clientId}`, "DELETE");
            alert("Cliente eliminado con éxito");
            router.refresh(); // Refrescar la página para actualizar la lista de clientes
        } catch (error) {
            console.error("Error al eliminar el cliente:", error); // Manejar errores durante la eliminación
            alert("Hubo un problema al eliminar el cliente. Por favor, inténtalo de nuevo.");
        }
    };

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) return <p>Cargando clientes...</p>;

    // Mostrar un mensaje de error si no se pudieron obtener los datos
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Lista de Clientes</h2>

            {/* Verificar si hay clientes disponibles */}
            {clients.length > 0 ? (
                <ul className="space-y-4">
                    {/* Iterar sobre los clientes y renderizar cada uno */}
                    {clients.map((client) => (
                        <li
                            key={client._id}
                            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
                        >
                            {/* Mostrar el logo del cliente o un marcador si no tiene */}
                            <div className="flex items-center space-x-4">
                                {client.logo ? (
                                    <img
                                        src={client.logo} // Mostrar el logo del cliente
                                        alt={`Logo de ${client.name}`}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-sm text-gray-500">Sin Logo</span>
                                    </div>
                                )}

                                {/* Mostrar detalles básicos del cliente */}
                                <div>
                                    <strong>Nombre:</strong> {client.name} <br />
                                    <strong>CIF:</strong> {client.cif}
                                </div>
                            </div>

                            {/* Botones de acciones para cada cliente */}
                            <div className="flex space-x-2">
                                {/* Botón para ver detalles del cliente */}
                                <Link href={`/pages/clients/${client._id}`}>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                        Ver Detalles
                                    </button>
                                </Link>

                                {/* Botón para actualizar el cliente */}
                                <button
                                    onClick={() => setSelectedClient(client)} // Seleccionar cliente para actualización
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                >
                                    Actualizar
                                </button>

                                {/* Botón para eliminar el cliente */}
                                <button
                                    onClick={() => handleDelete(client._id)} // Manejar la eliminación del cliente
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                // Mostrar mensaje si no hay clientes
                <p>No hay clientes disponibles.</p>
            )}

            {/* Formulario para actualizar el cliente seleccionado */}
            {selectedClient && (
                <UpdateClientForm
                    client={selectedClient} // Pasar el cliente seleccionado al formulario
                    onSuccess={() => {
                        setSelectedClient(null); // Limpiar el cliente seleccionado tras la actualización
                        router.refresh(); // Refrescar la página para mostrar los cambios
                    }}
                />
            )}
        </div>
    );
};

export default ClientList;
