"use client";

import ProjectForm from '@/app/components/proyects/ProyectForm';
import ProjectList from '@/app/components/proyects/ProyectList';

const Projects = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Proyectos</h1>
            <section className="mb-6">
                <ProjectForm onSuccess={() => window.location.reload()} />
            </section>
            <section>
                <ProjectList onSuccess={() => window.location.reload()} />
            </section>
        </div>
    );
};

export default Projects;
