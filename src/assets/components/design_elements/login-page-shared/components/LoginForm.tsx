"use client";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { FloatingInput } from "../ui/floating-input";
import { FloatingPasswordInput } from "../ui/floating-password-input";
import { FormState } from "../types/form-state.type";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useTransition } from "react";
import { LoginFormFields } from "../types/login-form-fields.type";
import { loginAction } from "../actions/login.action";

const initialState: FormState<LoginFormFields> = {
  errors: null,
  fieldsData: {
    email: "",
    password: "",
  },
  message: null,
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <div className="login-form-wrapper">
      <div className="login-header">
        <h2>Bienvenido</h2>
        <p>
          Ingrese sus credenciales para entrar al panel
        </p>
      </div>

      <form action={formAction} className="login-form">
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

        <div className="login-actions-row">
          <div className="login-remember-me">
            <Checkbox id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe" className="login-remember-label">
              Recordarme
            </label>
          </div>
          <Link href="/forgot-password" className="login-forgot-link">
            ¿Olvidó su contraseña?
          </Link>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Iniciando Sesión..." : "Iniciar Sesión"}
        </Button>

        {state.message && (
          <p className="login-status-banner">
            {state.message}
          </p>
        )}
      </form>

      <div className="login-footer">
        <p style={{ marginBottom: "0.25rem" }}>
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="login-footer-link">
            Crear Cuenta
          </Link>
        </p>
        <p>
          ¿Necesitas acceso?{" "}
          <Link href="/forgot-password" className="login-footer-link">
            Contactar Administrador
          </Link>
        </p>
      </div>
    </div>
  );
}
