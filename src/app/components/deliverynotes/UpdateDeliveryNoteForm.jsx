"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter
import useHandleForm from "@/app/hooks/useHandleForm";
import { DeliveryNoteSchema } from "@/app/utils/validator";
import { handleApiError } from "@/app/utils/helpers";
import { updateDeliveryNote } from "@/app/services/deliveryNoteService";
import useFetchData from "@/app/hooks/useFetchData";

const UpdateDeliveryNoteForm = ({ deliveryNote, onClose, onSuccess }) => {
    const router = useRouter(); // Inicializar router
    const { data: clients } = useFetchData("/api/client");
    const { data: projects } = useFetchData("/api/project");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [format, setFormat] = useState(deliveryNote.format); // Inicializar con el formato actual

    const { register, handleSubmit, errors, onSubmit } = useHandleForm(
        DeliveryNoteSchema,
        async (data) => {
            try {
                // Actualizar el albarán
                await updateDeliveryNote(deliveryNote._id, data);

                alert("Albarán actualizado con éxito");

                // Refrescar la página o notificar al componente padre
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.refresh(); // Refrescar la página si no se pasa onSuccess
                }
            } catch (error) {
                handleApiError(error);
            }
        }
    );

    // Filtrar proyectos según el cliente seleccionado
    useEffect(() => {
        if (deliveryNote.clientId) {
            const filtered = projects.filter(
                (project) => project.clientId === deliveryNote.clientId
            );
            setFilteredProjects(filtered);
        }
    }, [deliveryNote.clientId, projects]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Actualizar Albarán</h2>

            {/* Cliente */}
            <div>
                <label htmlFor="clientId" className="block font-medium mb-2">Cliente:</label>
                <select
                    id="clientId"
                    {...register("clientId")}
                    defaultValue={deliveryNote.clientId}
                    className="w-full p-2 border rounded-lg"
                    disabled
                >
                    <option value="">Seleccione un cliente</option>
                    {clients?.map((client) => (
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
                    defaultValue={deliveryNote.projectId}
                    className="w-full p-2 border rounded-lg"
                    disabled
                >
                    <option value="">Seleccione un proyecto</option>
                    {filteredProjects?.map((project) => (
                        <option key={project._id} value={project._id}>
                            {project.name}
                        </option>
                    ))}
                </select>
                {errors.projectId && <p className="text-red-500">{errors.projectId.message}</p>}
            </div>

            {/* Formato */}
            <div>
                <label htmlFor="format" className="block font-medium mb-2">Formato:</label>
                <select
                    id="format"
                    {...register("format")}
                    defaultValue={deliveryNote.format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                >
                    <option value="hours">Horas</option>
                    <option value="material">Material</option>
                </select>
                {errors.format && <p className="text-red-500">{errors.format.message}</p>}
            </div>

            {/* Campo dinámico */}
            {format === "hours" && (
                <div>
                    <label htmlFor="hours" className="block font-medium mb-2">Horas:</label>
                    <input
                        type="number"
                        id="hours"
                        {...register("hours")}
                        defaultValue={deliveryNote.hours || ""}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors.hours && <p className="text-red-500">{errors.hours.message}</p>}
                </div>
            )}
            {format === "material" && (
                <div>
                    <label htmlFor="material" className="block font-medium mb-2">Material:</label>
                    <input
                        type="text"
                        id="material"
                        {...register("material")}
                        defaultValue={deliveryNote.material || ""}
                        className="w-full p-2 border rounded-lg"
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
                    defaultValue={deliveryNote.description}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>

            {/* Fecha */}
            <div>
                <label htmlFor="workdate" className="block font-medium mb-2">Fecha de trabajo:</label>
                <input
                    type="date"
                    id="workdate"
                    {...register("workdate")}
                    defaultValue={deliveryNote.workdate.split("T")[0]}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.workdate && <p className="text-red-500">{errors.workdate.message}</p>}
            </div>

            {/* Botones */}
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Actualizar
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default UpdateDeliveryNoteForm;
