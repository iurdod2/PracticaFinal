import { apiRequest } from "@/app/utils/api";

export const createDeliveryNote = async (data) => {
    try {
        return await apiRequest("/api/deliverynote", "POST", data);
    } catch (error) {
        console.error("Error al crear el albarán:", error);
        throw error;
    }
};

export const updateDeliveryNote = async (id, data) => {
    try {
        return await apiRequest(`/api/deliverynote/${id}`, "PUT", data);
    } catch (error) {
        console.error("Error al actualizar el albarán:", error);
        throw error;
    }
};

export const fetchDeliveryNotes = async () => {
    return await apiRequest("/api/deliverynote", "GET");
};

export const downloadDeliveryNotePDF = async (id) => {
    const response = await fetch(`/api/deliverynote/pdf/${id}`);
    if (!response.ok) {
        throw new Error(`Error descargando PDF: ${response.status}`);
    }
    return response.blob();
};
