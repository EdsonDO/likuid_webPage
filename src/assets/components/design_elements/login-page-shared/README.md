# 📸 Login Snapshot — Carbon Copy

> Copia fiel de todos los componentes del login de Onekora.
> **Excluidas**: imágenes (`Onekoralogo.png`, `text_sloganOnekora.png`, `login-background.jpg`, `4AMINDUSTRIES_logo.png`).

---

## Árbol de archivos

```
_login-snapshot/
├── page/
│   └── page.tsx                    ← Página principal del login
├── components/
│   ├── LoginForm.tsx               ← Formulario de login (client component)
│   └── ballpit-background.tsx      ← Fondo animado con burbujas
├── actions/
│   └── login.action.ts             ← Server action: validación + redirect
├── types/
│   ├── login-form-fields.type.ts   ← Tipo de campos del formulario
│   └── form-state.type.ts          ← Tipo genérico de estado del formulario
├── ui/
│   ├── button.tsx                  ← Componente Button (CVA + Radix Slot)
│   ├── checkbox.tsx                ← Componente Checkbox (Radix)
│   ├── floating-input.tsx          ← Input con label flotante
│   └── floating-password-input.tsx ← Password input con toggle de visibilidad
└── lib/
    └── utils.ts                    ← Utilidad cn() (clsx + tailwind-merge)
```

---

## Dependencias externas usadas

| Librería | Uso |
|---|---|
| `framer-motion` | Animación de blobs en BallpitBackground |
| `lucide-react` | Íconos (Mail, Lock, Eye, EyeOff, Loader2, Sprout, CheckIcon) |
| `radix-ui` | Checkbox primitivo, Slot para Button |
| `class-variance-authority` | Variantes de Button |
| `clsx` + `tailwind-merge` | Utilidad `cn()` |
| `zod` | Validación del schema del login |
| `next/navigation` | `redirect()` post-login |
| `react-dom` | `useFormState`, `useFormStatus` |
| `next/image` | Componente Image (imágenes excluidas del snapshot) |
| `next/link` | Links de navegación |
