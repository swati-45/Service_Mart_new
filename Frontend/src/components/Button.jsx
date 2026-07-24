import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-blue-700 shadow-[0_2px_8px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)]",
    outline:
      "border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary hover:bg-blue-50",
    ghost: "text-primary hover:bg-blue-50",
    danger:
      "bg-red-600 text-white hover:bg-red-700 shadow-[0_2px_8px_rgba(220,38,38,0.25)]",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded-xl",
    md: "h-11 px-6 text-sm rounded-xl",
    lg: "h-14 px-8 text-base rounded-2xl",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
