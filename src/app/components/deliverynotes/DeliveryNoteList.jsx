"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter
import useFetchData from "@/app/hooks/useFetchData";
import PDFDownloader from "../common/PDFDownloader";
import { apiRequest } from "@/app/utils/api";
import UpdateDeliveryNoteForm from "./UpdateDeliveryNoteForm";

const DeliveryNoteList = () => {
    const router = useRouter(); // Inicializar router
    const { data: deliveryNotes, loading, error } = useFetchData("/api/deliverynote");
    const [selectedNote, setSelectedNote] = useState(null); // Estado para la actualización

    const handleDelete = async (id) => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este albarán?");
        if (!confirmDelete) return;

        try {
            await apiRequest(`/api/deliverynote/${id}`, "DELETE");
            alert("Albarán eliminado correctamente");
            router.refresh(); // Refrescar la página tras eliminar el albarán
        } catch (error) {
            console.error("Error al eliminar el albarán:", error);
            alert("Hubo un problema al eliminar el albarán. Por favor, inténtalo de nuevo.");
        }
    };

    if (loading) return <p className="text-gray-500">Cargando albaranes...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Lista de Albaranes</h2>
            {deliveryNotes.length > 0 ? (
                <ul className="space-y-4">
                    {deliveryNotes.map((note) => (
                        <li
                            key={note._id}
                            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                        >
                            <span>
                                <strong>{note.description}</strong> - {note.date}
                            </span>
                            <div className="flex space-x-4">
                                {note._id && (
                                    <PDFDownloader
                                        id={note._id}
                                        filename={`albaran-${note._id}.pdf`}
                                        buttonLabel="Descargar PDF"
                                    />
                                )}
                                <button
                                    onClick={() => setSelectedNote(note)} // Abrir el formulario de actualización
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                >
                                    Actualizar
                                </button>
                                <button
                                    onClick={() => handleDelete(note._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No hay albaranes disponibles.</p>
            )}

            {/* Formulario de actualización */}
            {selectedNote && (
                <UpdateDeliveryNoteForm
                    deliveryNote={selectedNote}
                    onClose={() => setSelectedNote(null)} // Cerrar el formulario
                    onSuccess={() => {
                        setSelectedNote(null);
                        router.refresh(); // Refrescar la página tras la actualización
                        alert("Albarán actualizado con éxito");
                    }}
                />
            )}
        </div>
    );
};

export default DeliveryNoteList;
