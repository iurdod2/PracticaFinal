"use client";

import { useState } from "react";
import RegisterForm from "@/app/components/onboarding/RegisterForm";
import ValidateForm from "@/app/components/onboarding/ValidateForm";
import LoginForm from "@/app/components/onboarding/LoginForm";

const OnboardingPage = () => {
    const [step, setStep] = useState("register"); // Estados: "register", "validate", "login"

    const handleRegisterSuccess = () => {
        setStep("validate"); // Avanzar al paso de validación
    };

    const handleValidationSuccess = () => {
        setStep("login"); // Avanzar al paso de login
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Onboarding</h1>
            {step === "register" && (
                <>
                    <RegisterForm onSuccess={handleRegisterSuccess} />
                    <p className="text-center mt-4">
                        ¿Ya tienes una cuenta? {" "}
                        <button
                            onClick={() => setStep("login")}
                            className="text-blue-500 hover:text-blue-700 underline"
                        >
                            Inicia sesión
                        </button>
                    </p>
                </>
            )}
            {step === "validate" && (
                <>
                    <ValidateForm onSuccess={handleValidationSuccess} />
                </>
            )}
            {step === "login" && (
                <>
                    <LoginForm />
                    <p className="text-center mt-4">
                        ¿No tienes una cuenta? {" "}
                        <button
                            onClick={() => setStep("register")}
                            className="text-blue-500 hover:text-blue-700 underline"
                        >
                            Regístrate
                        </button>
                    </p>
                </>
            )}
        </div>
    );
};

export default OnboardingPage;
