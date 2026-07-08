import * as React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: string;
  size?: string;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`login-btn btn-variant-${variant} btn-size-${size} ${className || ""}`}
      {...props}
    />
  );
}
