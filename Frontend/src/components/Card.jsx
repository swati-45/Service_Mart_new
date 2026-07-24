import React from "react";

const Card = ({
  children,
  className = "",
  padding = "p-4",
  hover = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border border-slate-200/80
        bg-white
        ${padding}
        shadow-sm
        transition-all
        duration-300
        ${
          hover
            ? "cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:border-blue-200"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;