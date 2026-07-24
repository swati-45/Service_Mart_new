import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Button from "../components/Button";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper title="404 - Page Not Found">
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-9xl font-bold text-gray-200 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page not found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate("/")} leftIcon={<Home size={18} />}>
          Go Home
        </Button>
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;
