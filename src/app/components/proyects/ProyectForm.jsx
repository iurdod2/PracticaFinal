"use client";

import { useRouter } from "next/navigation"; // Importar useRouter
import useHandleForm from "@/app/hooks/useHandleForm";
import { ProjectSchema } from "@/app/utils/validator";
import { handleApiError } from "@/app/utils/helpers";
import { createProject } from "@/app/services/proyectService";
import useFetchData from "@/app/hooks/useFetchData";

const ProjectForm = ({ onSuccess }) => {
    const router = useRouter(); // Inicializar router
    const { register, handleSubmit, errors, onSubmit } = useHandleForm(
        ProjectSchema,
        async (data) => {
            try {
                const projectData = {
                    name: data.name,
                    projectCode: data.projectCode,
                    email: data.email,
                    address: {
                        street: data.address.street,
                        number: data.address.number,
                        postal: data.address.postal,
                        city: data.address.city,
                        province: data.address.province,
                    },
                    code: data.code,
                    clientId: data.clientId,
                };

                await createProject(projectData);
                console.log("Proyecto creado con éxito");

                // Refrescar datos o redirigir tras la creación
                if (onSuccess) {
                    onSuccess(); // Llamar al manejador del componente padre
                } else {
                    router.refresh(); // Refrescar la página si no se pasa onSuccess
                }

                alert("Proyecto creado con éxito");
            } catch (error) {
                handleApiError(error);
            }
        }
    );

    const { data: clients, loading, error } = useFetchData("/api/client");

    if (loading) return <p className="text-gray-500">Cargando clientes...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Crear Proyecto</h2>

            {/* Nombre del proyecto */}
            <div>
                <input
                    {...register("name")}
                    placeholder="Nombre del proyecto"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Identificador del proyecto */}
            <div>
                <input
                    {...register("projectCode")}
                    placeholder="Identificador del proyecto"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.projectCode && <p className="text-red-500">{errors.projectCode.message}</p>}
            </div>

            {/* Email */}
            <div>
                <input
                    {...register("email")}
                    placeholder="Email del proyecto"
                    type="email"
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
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.street && <p className="text-red-500">{errors.address.street.message}</p>}
            </div>
            <div>
                <input
                    {...register("address.number")}
                    placeholder="Número"
                    type="number"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.address?.number && <p className="text-red-500">{errors.address.number.message}</p>}
            </div>
            <div>
                <input
                    {...register("address.postal")}
                    placeholder="Código Postal"
                    type="number"
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

            {/* Código interno del proyecto */}
            <div>
                <input
                    {...register("code")}
                    placeholder="Código interno del proyecto"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.code && <p className="text-red-500">{errors.code.message}</p>}
            </div>

            {/* Cliente asociado */}
            <div>
                <label htmlFor="clientId" className="block font-medium mb-2">
                    Cliente:
                </label>
                <select
                    {...register("clientId")}
                    id="clientId"
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

            {/* Botón de creación */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Crear Proyecto
            </button>
        </form>
    );
};

export default ProjectForm;
