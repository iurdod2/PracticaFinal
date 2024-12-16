"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter
import useFetchData from "@/app/hooks/useFetchData";
import Link from "next/link";
import UpdateProjectForm from "@/app/components/proyects/UpdateProyectForm";
import { apiRequest } from "@/app/utils/api";

const ProjectList = () => {
    const router = useRouter(); // Inicializar router
    const { data: projects, loading: loadingProjects, error: errorProjects } = useFetchData("/api/project");
    const { data: clients, loading: loadingClients, error: errorClients } = useFetchData("/api/client");
    const [selectedProject, setSelectedProject] = useState(null);

    const handleDelete = async (projectId) => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este proyecto?");
        if (!confirmDelete) return;

        try {
            await apiRequest(`/api/project/${projectId}`, "DELETE");
            alert("Proyecto eliminado con éxito");
            router.refresh(); // Refrescar la página después de eliminar
        } catch (error) {
            console.error("Error al eliminar el proyecto:", error);
            alert("Hubo un problema al eliminar el proyecto. Por favor, inténtalo de nuevo.");
        }
    };

    if (loadingProjects || loadingClients) return <p className="text-gray-500">Cargando proyectos...</p>;
    if (errorProjects || errorClients) return <p className="text-red-500">Error al cargar datos</p>;

    // Mapear el cliente de cada proyecto
    const projectsWithClientNames = projects.map((project) => {
        const client = clients.find((client) => client._id === project.clientId);
        return { ...project, clientName: client ? client.name : "Cliente no encontrado" };
    });

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Lista de Proyectos</h2>
            {projectsWithClientNames.length > 0 ? (
                <ul className="space-y-4">
                    {projectsWithClientNames.map((project) => (
                        <li
                            key={project._id}
                            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                        >
                            <div>
                                <p>
                                    <strong>Nombre:</strong> {project.name}
                                </p>
                                <p>
                                    <strong>Cliente:</strong> {project.clientName}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <Link href={`/pages/proyects/${project._id}`}>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                        Ver Detalles
                                    </button>
                                </Link>
                                <button
                                    onClick={() => setSelectedProject(project)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                >
                                    Actualizar
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No hay proyectos disponibles.</p>
            )}

            {selectedProject && (
                <UpdateProjectForm
                    project={selectedProject}
                    onSuccess={() => {
                        setSelectedProject(null);
                        router.refresh(); // Refrescar la página después de actualizar
                        alert("Proyecto actualizado con éxito");
                    }}
                />
            )}
        </div>
    );
};

export default ProjectList;
