// src/utils/validators.js
import * as Yup from "yup";

export const RegisterSchema = Yup.object({
    email: Yup.string()
        .email("No es un email válido")
        .required("El email es obligatorio"),
    password: Yup.string()
        .required("La contraseña es obligatoria"),
});

export const ValidationSchema = Yup.object({
    code: Yup.string().required('El código de validación es obligatorio'),
});

export const LoginSchema = Yup.object({
    email: Yup.string().email('No es un email válido').required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
});

export const ClientSchema = Yup.object({
    name: Yup.string().required("El nombre del cliente es obligatorio"),
    cif: Yup.string()
        .required("El CIF es obligatorio")
        .matches(/^[A-Z0-9]+$/, "El CIF debe contener solo letras mayúsculas y números"),
    address: Yup.object({
        street: Yup.string().required("La calle es obligatoria"),
        number: Yup.number()
            .required("El número es obligatorio")
            .positive("El número debe ser positivo"),
        postal: Yup.number()
            .required("El código postal es obligatorio")
            .positive("Debe ser un número positivo"),
        city: Yup.string().required("La ciudad es obligatoria"),
        province: Yup.string().required("La provincia es obligatoria"),
    }),
});

export const UpdateClientSchema = Yup.object({
    address: Yup.object({
        street: Yup.string().required("La calle es obligatoria"),
        number: Yup.number()
            .required("El número es obligatorio")
            .positive("El número debe ser positivo"),
        postal: Yup.number()
            .required("El código postal es obligatorio")
            .positive("Debe ser un número positivo"),
        city: Yup.string().required("La ciudad es obligatoria"),
        province: Yup.string().required("La provincia es obligatoria"),
    }),
});


export const ProjectSchema = Yup.object({
    name: Yup.string().required("El nombre del proyecto es obligatorio"),
    projectCode: Yup.string().required("El código del proyecto es obligatorio"),
    email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
    address: Yup.object({
        street: Yup.string().required("La calle es obligatoria"),
        number: Yup.number().required("El número es obligatorio").positive("Debe ser positivo"),
        postal: Yup.number().required("El código postal es obligatorio").positive("Debe ser positivo"),
        city: Yup.string().required("La ciudad es obligatoria"),
        province: Yup.string().required("La provincia es obligatoria"),
    }),
    notes: Yup.string(),
});

export const DeliveryNoteSchema = Yup.object({
    clientId: Yup.string().required("El cliente es obligatorio"),
    projectId: Yup.string().required("El proyecto es obligatorio"),
    format: Yup.string()
        .required("El formato es obligatorio")
        .oneOf(["material", "hours"], "El formato no es válido"),
    material: Yup.string().nullable().when("format", (format, schema) =>
        format === "material" ? schema.required("El tipo de material es obligatorio") : schema.strip()
    ),
    hours: Yup.number().nullable().when("format", (format, schema) =>
        format === "hours"
            ? schema.required("Las horas son obligatorias").positive("Las horas deben ser positivas")
            : schema.strip()
    ),
    description: Yup.string().required("La descripción es obligatoria"),
    workdate: Yup.date().required("La fecha de trabajo es obligatoria"),
});



