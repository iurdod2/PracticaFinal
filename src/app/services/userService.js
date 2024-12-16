import { apiRequest } from "@/app/utils/api";

export const registerUser = async (data) => {
    console.log("Datos enviados a la API:", {
        email: data.email,
        password: data.password,
    });

    return await apiRequest("/api/user/register", "POST", {
        email: data.email,
        password: data.password,
    });
};

export const loginUser = async (data) => {
    return await apiRequest("/api/user/login", "POST", data);
};

export const validateUser = async (data) => {
    const token = localStorage.getItem("jwt"); // Obtener el token de localStorage
    if (!token) {
        throw new Error("Token no encontrado. El usuario no está autenticado.");
    }

    return await apiRequest("/api/user/validation", "PUT", data, token);
};
