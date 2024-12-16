import Link from "next/link";

const NavigationMenu = () => {
    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <ul className="flex justify-around items-center">
                <li className="flex-grow text-center">
                    <Link
                        href="/"
                        className="text-white block transform transition duration-300 ease-in-out hover:scale-125"
                    >
                        Inicio
                    </Link>
                </li>
                <li className="flex-grow text-center">
                    <Link
                        href="/pages/clients"
                        className="text-white block transform transition duration-300 ease-in-out hover:scale-125"
                    >
                        Clientes
                    </Link>
                </li>
                <li className="flex-grow text-center">
                    <Link
                        href="/pages/proyects"
                        className="text-white block transform transition duration-300 ease-in-out hover:scale-125"
                    >
                        Proyectos
                    </Link>
                </li>
                <li className="flex-grow text-center">
                    <Link
                        href="/pages/deliverynotes"
                        className="text-white block transform transition duration-300 ease-in-out hover:scale-125"
                    >
                        Albaranes
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationMenu;
