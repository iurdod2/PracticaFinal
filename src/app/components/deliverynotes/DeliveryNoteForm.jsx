"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter
import useHandleForm from "@/app/hooks/useHandleForm";
import { DeliveryNoteSchema } from "@/app/utils/validator";
import { handleApiError } from "@/app/utils/helpers";
import { createDeliveryNote } from "@/app/services/deliveryNoteService";
import useFetchData from "@/app/hooks/useFetchData";

const DeliveryNoteForm = ({ onSuccess }) => {
    const router = useRouter(); // Inicializar router
    const { data: clients, loading: loadingClients } = useFetchData("/api/client");
    const { data: projects, loading: loadingProjects } = useFetchData("/api/project");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [format, setFormat] = useState(""); // Estado para el formato seleccionado (material u horas)

    const { register, handleSubmit, errors, onSubmit } = useHandleForm(
        DeliveryNoteSchema,
        async (data) => {
            try {
                await createDeliveryNote(data);

                // Refrescar página o notificar éxito
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.refresh(); // Refrescar la página si no se pasa onSuccess
                }

                alert("Albarán creado con éxito");
            } catch (error) {
                handleApiError(error);
            }
        }
    );

    // Filtrar proyectos en función del cliente seleccionado
    useEffect(() => {
        if (selectedClient) {
            const filtered = projects.filter((project) => project.clientId === selectedClient);
            setFilteredProjects(filtered);
        } else {
            setFilteredProjects(projects);
        }
    }, [selectedClient, projects]);

    if (loadingClients || loadingProjects) return <p>Cargando datos...</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Albarán</h2>

            {/* Cliente */}
            <div>
                <label htmlFor="clientId" className="block font-medium mb-2">Cliente:</label>
                <select
                    id="clientId"
                    {...register("clientId")}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                >
                    <option value="">Seleccione un cliente</option>
                    {clients.map((client) => (
                        <option key={client._id} value={client._id}>
                            {client.name}
                        </option>
                    ))}
                </select>
                {errors.clientId && <p className="text-red-500">{errors.clientId.message}</p>}
            </div>

            {/* Proyecto */}
            <div>
                <label htmlFor="projectId" className="block font-medium mb-2">Proyecto:</label>
                <select
                    id="projectId"
                    {...register("projectId")}
                    className="w-full p-2 border rounded-lg"
                >
                    <option value="">Seleccione un proyecto</option>
                    {filteredProjects.map((project) => (
                        <option key={project._id} value={project._id}>
                            {project.name}
                        </option>
                    ))}
                </select>
                {errors.projectId && <p className="text-red-500">{errors.projectId.message}</p>}
            </div>

            {/* Formato (Horas o Material) */}
            <div>
                <label htmlFor="format" className="block font-medium mb-2">Formato:</label>
                <select
                    id="format"
                    {...register("format")}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                >
                    <option value="">Seleccione el formato</option>
                    <option value="hours">Horas</option>
                    <option value="material">Material</option>
                </select>
                {errors.format && <p className="text-red-500">{errors.format.message}</p>}
            </div>

            {/* Campo dinámico basado en el formato */}
            {format === "hours" && (
                <div>
                    <label htmlFor="hours" className="block font-medium mb-2">Número de Horas:</label>
                    <input
                        type="number"
                        id="hours"
                        {...register("hours")}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Introduce el número de horas"
                    />
                    {errors.hours && <p className="text-red-500">{errors.hours.message}</p>}
                </div>
            )}
            {format === "material" && (
                <div>
                    <label htmlFor="material" className="block font-medium mb-2">Tipo de Material:</label>
                    <input
                        type="text"
                        id="material"
                        {...register("material")}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Introduce el tipo de material"
                    />
                    {errors.material && <p className="text-red-500">{errors.material.message}</p>}
                </div>
            )}

            {/* Descripción */}
            <div>
                <label htmlFor="description" className="block font-medium mb-2">Descripción:</label>
                <textarea
                    id="description"
                    {...register("description")}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Descripción del trabajo"
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>

            {/* Fecha de trabajo */}
            <div>
                <label htmlFor="workdate" className="block font-medium mb-2">Fecha de trabajo:</label>
                <input
                    type="date"
                    id="workdate"
                    {...register("workdate")}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.workdate && <p className="text-red-500">{errors.workdate.message}</p>}
            </div>

            {/* Botón de enviar */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
            >
                Crear Albarán
            </button>
        </form>
    );
};

export default DeliveryNoteForm;
