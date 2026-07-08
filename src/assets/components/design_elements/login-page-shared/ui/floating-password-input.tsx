"use client";

import { Eye, EyeOff, Lock, LucideIcon } from "lucide-react";
import * as React from "react";

interface FloatingPasswordInputProps extends React.ComponentProps<"input"> {
  label: string;
  icon?: LucideIcon;
  error?: string | string[];
}

const FloatingPasswordInput = React.forwardRef<
  HTMLInputElement,
  FloatingPasswordInputProps
>(({ className, label, icon: Icon = Lock, id, error, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(props.value || props.defaultValue || "");

  React.useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(props.value);
    }
  }, [props.value]);

  const hasValue = !!internalValue;
  const errorMessage = Array.isArray(error) ? error[0] : error;
  const hasError = !!errorMessage;

  return (
    <div className="login-input-group">
      <div
        className={`login-input-container ${hasError ? "error" : ""} ${isFocused ? "focused" : ""} ${hasValue ? "has-value" : ""}`}
      >
        <label htmlFor={id} className="login-input-label">
          {label}
        </label>

        <div className="login-input-icon">
          <Icon className="size-5" />
        </div>

        <input
          id={id}
          type={isVisible ? "text" : "password"}
          className={`login-input ${className || ""}`}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setInternalValue(e.target.value);
            props.onChange?.(e);
          }}
          {...props}
        />

        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          className="login-visibility-btn"
          tabIndex={-1}
        >
          {isVisible ? (
            <EyeOff className="size-5" aria-hidden="true" />
          ) : (
            <Eye className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {errorMessage && (
        <p className="login-error-msg">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

FloatingPasswordInput.displayName = "FloatingPasswordInput";

export { FloatingPasswordInput };
