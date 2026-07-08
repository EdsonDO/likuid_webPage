"use server";

import { FormState } from "../types/form-state.type";
import { redirect } from "next/navigation";

export type RegisterFormFields = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export async function registerAction(
  prevState: FormState<RegisterFormFields>,
  formData: FormData,
): Promise<FormState<RegisterFormFields>> {
  const name = (formData.get("name") as string || "").trim();
  const email = (formData.get("email") as string || "").trim();
  const password = (formData.get("password") as string || "").trim();
  const role = (formData.get("role") as string || "").trim();

  const errors: { [key: string]: string[] } = {};

  if (!name) {
    errors.name = ["El nombre completo es requerido"];
  }

  if (!email) {
    errors.email = ["Ingrese un correo electrónico"];
  } else if (!email.includes("@")) {
    errors.email = ["Ingrese un correo electrónico válido"];
  }

  if (!password) {
    errors.password = ["La contraseña es requerida"];
  } else if (password.length < 5) {
    errors.password = ["La contraseña debe tener al menos 5 caracteres"];
  }

  if (!role || (role !== "student" && role !== "client")) {
    errors.role = ["Seleccione un rol válido"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      fieldsData: { name, email, password, role },
      message: "Por favor corrija los errores en el formulario",
    };
  }

  redirect("/login");
}
