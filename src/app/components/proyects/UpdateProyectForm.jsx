"use client";

import { useRouter } from "next/navigation"; // Importar useRouter
import useHandleForm from "@/app/hooks/useHandleForm";
import { ProjectSchema } from "@/app/utils/validator";
import { handleApiError } from "@/app/utils/helpers";
import { updateProject } from "@/app/services/proyectService";

const UpdateProjectForm = ({ project, onSuccess }) => {
    const router = useRouter(); // Inicializar router

    const { register, handleSubmit, errors, onSubmit } = useHandleForm(
        ProjectSchema,
        async (data) => {
            try {
                // Actualizar proyecto
                await updateProject(project._id, data);

                console.log("Proyecto actualizado con éxito");

                // Refrescar la página o notificar al componente padre
                if (onSuccess) {
                    onSuccess(); // Llamar al manejador de éxito del componente padre
                } else {
                    router.refresh(); // Refrescar la página si no se pasa onSuccess
                }

                alert("Proyecto actualizado con éxito");
            } catch (error) {
                handleApiError(error);
            }
        }
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Actualizar Proyecto</h2>

            {/* Nombre del proyecto */}
            <div>
                <input
                    {...register("name")}
                    placeholder="Nombre del proyecto"
                    defaultValue={project.name}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Código del proyecto */}
            <div>
                <input
                    {...register("projectCode")}
                    placeholder="Código del proyecto"
                    defaultValue={project.projectCode}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.projectCode && <p className="text-red-500">{errors.projectCode.message}</p>}
            </div>

            {/* Email */}
            <div>
                <input
                    {...register("email")}
                    placeholder="Email"
                    type="email"
                    defaultValue={project.email}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Dirección */}
            <h3 className="text-xl font-semibold mt-4">Dirección</h3>

            <div>
                <input
                    {...register("address.street")}
                    placeholder="Calle"
                    defaultValue={project.address?.street}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.street && <p className="text-red-500">{errors.address.street.message}</p>}
            </div>
            <div>
                <input
                    {...register("address.number")}
                    placeholder="Número"
                    type="number"
                    defaultValue={project.address?.number}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.number && <p className="text-red-500">{errors.address.number.message}</p>}
            </div>
            <div>
                <input
                    {...register("address.postal")}
                    placeholder="Código Postal"
                    type="number"
                    defaultValue={project.address?.postal}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.postal && <p className="text-red-500">{errors.address.postal.message}</p>}
            </div>
            <div>
                <input
                    {...register("address.city")}
                    placeholder="Ciudad"
                    defaultValue={project.address?.city}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.city && <p className="text-red-500">{errors.address.city.message}</p>}
            </div>
            <div>
                <input
                    {...register("address.province")}
                    placeholder="Provincia"
                    defaultValue={project.address?.province}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.province && <p className="text-red-500">{errors.address.province.message}</p>}
            </div>

            {/* Notas */}
            <div>
                <textarea
                    {...register("notes")}
                    placeholder="Notas del proyecto"
                    defaultValue={project.notes}
                    className="w-full p-2 border rounded-lg"
                />
                {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
            </div>

            {/* Botón de actualización */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Actualizar Proyecto
            </button>
        </form>
    );
};

export default UpdateProjectForm;
