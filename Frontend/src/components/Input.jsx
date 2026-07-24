import React from "react";

const Input = React.forwardRef(
  (
    { label, error, leftIcon, rightIcon, className = "", id, ...props },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={`block w-full rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm bg-white transition-all duration-200
            ${error ? "border-red-400 focus:ring-red-200 focus:border-red-400" : "border-gray-200 hover:border-gray-300"}
            ${leftIcon ? "pl-10" : "pl-4"}
            ${rightIcon ? "pr-10" : "pr-4"}
            ${className}
            h-11`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
