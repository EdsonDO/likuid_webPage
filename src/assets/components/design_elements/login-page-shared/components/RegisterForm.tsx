"use client";

import { Button } from "../ui/button";
import { FloatingInput } from "../ui/floating-input";
import { FloatingPasswordInput } from "../ui/floating-password-input";
import { FormState } from "../types/form-state.type";
import { Mail, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { RegisterFormFields, registerAction } from "../actions/register.action";

const initialState: FormState<RegisterFormFields> = {
  errors: null,
  fieldsData: {
    name: "",
    email: "",
    password: "",
    role: "",
  },
  message: null,
};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <div className="login-form-wrapper">
      <div className="login-header">
        <h2>Crear Cuenta</h2>
        <p>
          Regístrese para acceder a la plataforma
        </p>
      </div>

      <form action={formAction} className="login-form">
        <FloatingInput
          id="name"
          name="name"
          type="text"
          label="Nombre completo"
          icon={User}
          defaultValue={state.fieldsData.name}
          error={state.errors?.name}
        />

        <FloatingInput
          id="email"
          name="email"
          type="email"
          label="Correo electrónico"
          icon={Mail}
          defaultValue={state.fieldsData.email}
          error={state.errors?.email}
        />

        <FloatingPasswordInput
          id="password"
          name="password"
          label="Contraseña"
          defaultValue={state.fieldsData.password}
          error={state.errors?.password}
        />

        <div className="login-input-group">
          <div
            className={`login-input-container has-value ${state.errors?.role ? "error" : ""}`}
          >
            <label htmlFor="role" className="login-input-label">
              Tipo de perfil
            </label>

            <div className="login-input-icon">
              <User className="size-5" />
            </div>

            <select
              id="role"
              name="role"
              className="login-select"
              defaultValue={state.fieldsData.role}
            >
              <option value="student">Estudiante (Universidad de Huánuco)</option>
              <option value="client">Reclutador / MYPE</option>
            </select>

            <div className="login-select-arrow">
              <ChevronDown className="size-5" />
            </div>
          </div>

          {state.errors?.role && (
            <p className="login-error-msg">
              {state.errors.role[0]}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Registrando..." : "Crear Cuenta"}
        </Button>

        {state.message && (
          <p className="login-status-banner">
            {state.message}
          </p>
        )}
      </form>

      <div className="login-footer">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="login-footer-link">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
