import { apiRequest } from "../utils/api";

export const updateClient = async (id, data) => {
    try {
        return await apiRequest(`/api/client/${id}`, "PUT", data);
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        throw error;
    }
};
