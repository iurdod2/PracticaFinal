"use client";

import useHandleForm from "@/app/hooks/useHandleForm";
import { RegisterSchema } from "@/app/utils/validator";
import { handleApiError } from "@/app/utils/helpers";
import { registerUser } from "@/app/services/userService";

const RegisterForm = ({ onSuccess }) => {
    const { register, handleSubmit, errors, onSubmit } = useHandleForm(
        RegisterSchema,
        async (data) => {
            try {
                const response = await registerUser(data); // Llama a la API para registrar el usuario
                console.log("Usuario registrado con éxito:", response);

                // Guardar el token en localStorage
                if (response?.token) {
                    localStorage.setItem("jwt", response.token); // Guardar token en localStorage
                    console.log("Token guardado en localStorage:", localStorage.getItem("jwt"));
                } else {
                    console.error("Token no encontrado en la respuesta de la API.");
                }

                if (onSuccess) onSuccess(); // Notificar éxito o redirigir
            } catch (error) {
                handleApiError(error); // Manejar error
            }
        }
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Registro</h2>
            <div>
                <input
                    {...register("email")}
                    placeholder="Introduce email"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
                <input
                    {...register("password")}
                    placeholder="Introduce contraseña"
                    type="password"
                    className="w-full p-2 border rounded-lg"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
            >
                Registrar
            </button>
        </form>
    );
};

export default RegisterForm;
