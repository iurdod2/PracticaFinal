"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            router.push("pages/onboarding"); // Redirigir al flujo de onboarding si no está autenticado
        }
    }, [router]);

    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-4xl font-bold text-center text-blue-600">Digitalización de Albaranes</h1>
            <p className="text-lg text-center text-gray-700">
                Simplifica la gestión de <strong>Clientes</strong>, <strong>Proyectos</strong>, y
                <strong>Albaranes</strong> con nuestra plataforma.
            </p>

            {/* Accesos rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/pages/clients">
                    <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200 cursor-pointer">
                        <h3 className="text-2xl font-semibold text-blue-700">Clientes</h3>
                        <p className="text-gray-600 mt-2">
                            Administra la información de tus clientes, añade nuevos y actualiza sus datos.
                        </p>
                    </div>
                </Link>
                <Link href="/pages/proyects">
                    <div className="bg-green-100 p-6 rounded-lg shadow-md hover:bg-green-200 cursor-pointer">
                        <h3 className="text-2xl font-semibold text-green-700">Proyectos</h3>
                        <p className="text-gray-600 mt-2">
                            Gestiona los proyectos asociados a tus clientes y organiza su información.
                        </p>
                    </div>
                </Link>
                <Link href="/pages/deliverynotes">
                    <div className="bg-yellow-100 p-6 rounded-lg shadow-md hover:bg-yellow-200 cursor-pointer">
                        <h3 className="text-2xl font-semibold text-yellow-700">Albaranes</h3>
                        <p className="text-gray-600 mt-2">
                            Crea, edita y visualiza los albaranes de tus proyectos de manera eficiente.
                        </p>
                    </div>
                </Link>
            </div>

            {/* Sección informativa */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-800">¿Qué puedes hacer aquí?</h2>
                <ul className="list-disc pl-6 mt-4 text-gray-700">
                    <li>
                        <strong>Gestión de Clientes:</strong> Agrega, edita y elimina clientes en un solo lugar.
                    </li>
                    <li>
                        <strong>Organización de Proyectos:</strong> Vincula proyectos con clientes y mantén todo
                        organizado.
                    </li>
                    <li>
                        <strong>Control de Albaranes:</strong> Lleva un registro detallado de los albaranes con
                        formatos dinámicos.
                    </li>
                    <li>
                        <strong>Descarga de PDFs:</strong> Genera y descarga albaranes en formato PDF para compartir.
                    </li>
                </ul>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-semibold">¡Comienza ahora!</h3>
                <p className="mt-2">
                    Navega por las secciones para gestionar tus datos de manera rápida y eficiente.
                </p>
                <div className="mt-4">
                    <Link href="/pages/clients">
                        <button className="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
                            Ir a Clientes
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
