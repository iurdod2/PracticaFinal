"use client";

import "@/app/styles/deliverynotes.css";
import DeliveryNoteForm from '@/app/components/deliverynotes/DeliveryNoteForm';
import DeliveryNoteList from '@/app/components/deliverynotes/DeliveryNoteList';

const DeliveryNotes = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Albaranes</h1>
            <section className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Albarán</h2>
                <DeliveryNoteForm onSuccess={() => window.location.reload()} />
            </section>
            <section className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Lista de Albaranes</h2>
                <DeliveryNoteList />
            </section>
        </div>
    );
};

export default DeliveryNotes;

