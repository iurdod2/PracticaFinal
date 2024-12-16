import { apiRequest } from "@/app/utils/api";

export const createProject = async (data) => {
    return await apiRequest("/api/project", "POST", data);
};

export const fetchProjects = async () => {
    return await apiRequest("/api/project", "GET");
};

export const updateProject = async (id, data) => {
    try {
        return await apiRequest(`/api/project/${id}`, "PUT", data);
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
        throw error;
    }
};
