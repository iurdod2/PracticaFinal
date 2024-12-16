"use client";

import "@/app/styles/globals.css";
import { useEffect, useState } from "react";
import NavigationMenu from "@/app/components/NavigationMenu/page";
import Header from "./components/Header/page";
import Footer from "./components/Footer/page";

export default function RootLayout({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        setIsAuthenticated(!!token); // Autenticado si existe el token
    }, []); // Se ejecuta solo una vez al montarse

    return (
        <html lang="es">
            <head>
                <title>Digitalización de Albaranes</title>
                <meta
                    name="description"
                    content="Aplicación para gestionar albaranes entre clientes y proveedores"
                />
            </head>
            <body className="flex flex-col min-h-screen">
                <Header />
                {isAuthenticated && <NavigationMenu />} {/* El menú siempre visible si autenticado */}
                <main className="flex-grow container mx-auto p-6">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
