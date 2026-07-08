"use server";

import { FormState } from "../types/form-state.type";
import { redirect } from "next/navigation";
import { LoginFormFields } from "../types/login-form-fields.type";

export async function loginAction(
  prevState: FormState<LoginFormFields>,
  formData: FormData,
): Promise<FormState<LoginFormFields>> {
  const email = (formData.get("email") as string || "").trim();
  const password = (formData.get("password") as string || "").trim();

  const errors: { [key: string]: string[] } = {};

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

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      fieldsData: { email, password },
      message: "Por favor corrija los errores en el formulario",
    };
  }

  if (email === "edsondionicioo@gmail.com" && password === "12345") {
    redirect("/student");
  } else if (email === "dannielsmn@gmail.com" && password === "12345") {
    redirect("/client");
  }

  return {
    errors: null,
    fieldsData: { email, password },
    message: "Credenciales incorrectas o perfil no registrado",
  };
}
