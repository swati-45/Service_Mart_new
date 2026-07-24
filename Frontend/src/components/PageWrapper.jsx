import React from "react";
import { Helmet } from "react-helmet-async";

const PageWrapper = ({
  children,
  title,
  description,
  className = "",
}) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      <Helmet>
        <title>
          {title
            ? `${title} | ServiceMart`
            : "ServiceMart — Trusted Home Services at Fixed Prices"}
        </title>
        {description && <meta name="description" content={description} />}
      </Helmet>

      <main className={`flex-1 ${className}`}>{children}</main>
    </div>
  );
};

export default PageWrapper;
