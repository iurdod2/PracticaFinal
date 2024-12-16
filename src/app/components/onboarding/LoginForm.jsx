"use client";

import useHandleForm from "@/app/hooks/useHandleForm";
import { LoginSchema } from "@/app/utils/validator";
import { handleApiError } from "@/app/utils/helpers";
import { loginUser } from "@/app/services/userService";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();

    const { register, handleSubmit, errors, onSubmit } = useHandleForm(
        LoginSchema,
        async (data) => {
            try {
                const response = await loginUser(data);
                console.log("Inicio de sesión exitoso:", response);

                // Guardar el token en localStorage
                if (response?.token) {
                    localStorage.setItem("jwt", response.token);
                    console.log("Token guardado en localStorage:", localStorage.getItem("jwt"));

                    // Redirigir al usuario a la página principal
                    router.push("/");
                } else {
                    console.error("Token no encontrado en la respuesta.");
                }
            } catch (error) {
                handleApiError(error); // Manejar errores de inicio de sesión
            }
        }
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar Sesión</h2>
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
                Iniciar Sesión
            </button>
        </form>
    );
};

export default LoginForm;
