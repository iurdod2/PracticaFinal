"use client";

import useFetchData from "@/app/hooks/useFetchData";
import { useRouter } from "next/navigation";

const ProjectDetails = ({ params }) => {
    const router = useRouter();
    const { data: project, loading, error } = useFetchData(`/api/project/one/${params.id}`);

    if (loading) return <p className="text-gray-500">Cargando detalles del proyecto...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Detalles del Proyecto</h2>
            <div className="space-y-4">
                <p className="text-lg">
                    <strong className="font-semibold">Nombre:</strong> {project.name}
                </p>
                <p className="text-lg">
                    <strong className="font-semibold">Código:</strong> {project.code}
                </p>
                <p className="text-lg">
                    <strong className="font-semibold">Cliente:</strong> {project.clientId || "Sin cliente"}
                </p>
                <h3 className="text-2xl font-semibold mt-4">Dirección:</h3>
                <p className="text-lg">
                    {project.address?.street}, {project.address?.number}, {project.address?.postal}, {project.address?.city}, {project.address?.province}
                </p>
                <h3 className="text-2xl font-semibold mt-4">Notas:</h3>
                <p className="text-lg">{project.notes || "Sin notas"}</p>
            </div>
            <button
                onClick={() => router.back()}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Volver
            </button>
        </div>
    );
};

export default ProjectDetails;
