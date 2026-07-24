import React from "react";

const Badge = ({ children, variant = "info", size = "md", className = "" }) => {
  const baseClasses = "inline-flex items-center font-semibold rounded-full";

  const variants = {
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    info: "bg-blue-50 text-blue-700",
    danger: "bg-red-50 text-red-700",
    gray: "bg-gray-50 text-gray-600",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
