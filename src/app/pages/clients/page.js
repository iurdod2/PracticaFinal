"use client";

import { useRouter } from "next/navigation"; // Importar useRouter
import ClientForm from "@/app/components/clients/ClientForm";
import ClientList from "@/app/components/clients/ClientList";

const ClientsPage = () => {
    const router = useRouter(); // Inicializar router

    // Función para refrescar la página
    const refreshPage = () => {
        router.refresh();
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Clientes</h2>
            <section className="mb-6 bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Crear Cliente</h3>
                {/* Pasar refreshPage al formulario */}
                <ClientForm onSuccess={refreshPage} />
            </section>
            <section className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Lista de Clientes</h3>
                {/* Pasar refreshPage a la lista */}
                <ClientList onUpdate={refreshPage} />
            </section>
        </div>
    );
};

export default ClientsPage;
