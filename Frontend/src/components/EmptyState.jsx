import React from "react";

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-white rounded-[24px] border border-dashed border-gray-200 shadow-[0_4px_20px_rgb(0,0,0,0.04)]">
      {Icon && (
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-500">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-4 max-w-sm">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
