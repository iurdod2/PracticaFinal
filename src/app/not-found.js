"use client";

import Link from "next/link";

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
            <p className="text-2xl font-semibold text-gray-700 mb-6">
                Oops! La página que buscas no existe.
            </p>
            <p className="text-lg text-gray-600 mb-8 text-center">
                Puede que la página haya sido eliminada, su URL sea incorrecta, o simplemente no exista en este momento.
            </p>
            <Link href="/">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600">
                    Volver a la página principal
                </button>
            </Link>
        </div>
    );
}
