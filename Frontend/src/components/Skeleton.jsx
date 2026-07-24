import React from "react";

const Skeleton = ({ className = "", variant = "text" }) => {
  const baseClasses = "animate-pulse bg-gray-200";

  const variants = {
    text: "rounded",
    card: "rounded-[24px]",
    avatar: "rounded-full",
  };

  return <div className={`${baseClasses} ${variants[variant]} ${className}`} />;
};

export default Skeleton;
