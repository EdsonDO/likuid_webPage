"use client";

import { LucideIcon } from "lucide-react";
import * as React from "react";

interface FloatingInputProps extends React.ComponentProps<"input"> {
  label: string;
  icon?: LucideIcon;
  error?: string | string[];
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, type, label, icon: Icon, id, error, ...props }, ref) => {
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

          {Icon && (
            <div className="login-input-icon">
              <Icon className="size-5" />
            </div>
          )}

          <input
            id={id}
            type={type}
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
        </div>

        {errorMessage && (
          <p className="login-error-msg">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
