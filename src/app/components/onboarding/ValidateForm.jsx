"use client";

import useHandleForm from "@/app/hooks/useHandleForm";
import { ValidationSchema } from "@/app/utils/validator";
import { validateUser } from "@/app/services/userService";
import { handleApiError } from "@/app/utils/helpers";

const ValidateForm = ({ onSuccess }) => {
    const { register, handleSubmit, errors, onSubmit } = useHandleForm(
        ValidationSchema,
        async (data) => {
            try {
                const response = await validateUser(data);
                console.log("Validación exitosa:", response);
                if (onSuccess) onSuccess(); // Avanzar al siguiente paso o mostrar éxito
            } catch (error) {
                console.error("Error al validar usuario:", error);
                handleApiError(error); // Mostrar mensaje al usuario
            }
        }
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Validar Código</h2>
            <div>
                <input
                    {...register("code")}
                    placeholder="Introduce el código de validación"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.code && <p className="text-red-500">{errors.code.message}</p>}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
            >
                Validar
            </button>
        </form>
    );
};

export default ValidateForm;
