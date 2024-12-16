"use client";

import { useRouter } from "next/navigation";
import useFetchData from "@/app/hooks/useFetchData";

const ClientDetails = ({ params }) => {
    const router = useRouter();

    // Obtener detalles del cliente
    const { data: client, loading: loadingClient, error: errorClient } = useFetchData(`/api/client/${params.id}`);

    // Obtener proyectos asociados al cliente
    const { data: projects, loading: loadingProjects, error: errorProjects } = useFetchData("/api/project");

    if (loadingClient || loadingProjects) return <p className="text-gray-500">Cargando datos...</p>;
    if (errorClient || errorProjects) return <p className="text-red-500">Error al cargar datos</p>;

    // Filtrar proyectos asociados al cliente
    const clientProjects = projects.filter((project) => project.clientId === client._id);

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Detalles del Cliente</h2>
            
            {/* Imagen del logo */}
            {client.logo && (
                <div className="flex justify-center mb-6">
                    <img
                        src={client.logo}
                        alt={`Logo de ${client.name}`}
                        className="w-32 h-32 object-cover rounded-full shadow-md"
                    />
                </div>
            )}

            <div className="space-y-4">
                <p className="text-lg">
                    <strong className="font-semibold">Nombre:</strong> {client.name}
                </p>
                <p className="text-lg">
                    <strong className="font-semibold">CIF:</strong> {client.cif}
                </p>
                <h3 className="text-2xl font-semibold mt-4">Dirección:</h3>
                <p className="text-lg">
                    {client.address.street}, {client.address.number}, {client.address.postal}, {client.address.city}, {client.address.province}
                </p>
            </div>

            <h3 className="text-2xl font-semibold mt-6">Proyectos Asociados:</h3>
            {clientProjects.length > 0 ? (
                <ul className="space-y-4 mt-4">
                    {clientProjects.map((project) => (
                        <li
                            key={project._id}
                            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                        >
                            <span className="text-lg font-medium">{project.name}</span>
                            <button
                                onClick={() => router.push(`/pages/proyects/${project._id}`)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Ver Detalles
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 mt-4">No hay proyectos asociados a este cliente.</p>
            )}

            <button
                onClick={() => router.back()}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Volver
            </button>
        </div>
    );
};

export default ClientDetails;
