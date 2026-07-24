import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Check, ChevronLeft } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import Skeleton from "../components/Skeleton";
// import { providerService } from "../api/providerService";
// import { PROVIDERS } from "../utils/constants";
import { setBooking } from "../store/slice/bookingSlice";

// Lazy loading steps could be done, but they are relatively small, importing directly.
import StepSchedule from "./components/StepSchedule";
import StepAddress from "./components/StepAddress";
import StepPayment from "./components/StepPayments";
import api from "../api/api"

const steps = [
  { id: 1, name: "Schedule", path: "schedule" },
  { id: 2, name: "Address", path: "address" },
  { id: 3, name: "Confirm", path: "payment" },
];

const BookingPage = () => {
  const { providerId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  // current step from URL path
  const currentPath = location.pathname.split("/").pop();
  const currentStep = steps.find((s) => s.path === currentPath)?.id || 1;

useEffect(() => {
  const fetchProvider = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(`/providers/${providerId}`);

      const provider = data.data.provider;

      setProvider(provider);

      dispatch(
        setBooking({
          providerId: provider._id,
        })
      );
    } catch (error) {
      console.error(error);
     // navigate("/services");
    } finally {
      setLoading(false);
    }
  };

  fetchProvider();
}, [providerId, navigate, dispatch]);
  

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStepPath = steps[currentStep - 2].path;
      navigate(`/book/${providerId}/${prevStepPath}`);
    } else {
      navigate(`/providers/${providerId}`);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 mt-10">
          <Skeleton className="h-24 w-full mb-8" />
          <Skeleton className="h-[400px] w-full" variant="card" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={`Book ${provider?.user?.name}`}
      className="bg-[#fafafa] min-h-screen"
    >
      <div className="bg-white border-b border-gray-200 sticky top-[64px] z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 px-3 py-1.5 -ml-3 rounded-lg text-gray-600 hover:text-primary hover:bg-blue-50 transition-all group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-medium">Back</span>
            </button>
            <h2 className="font-semibold text-lg">Book Service</h2>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>

          {/* Progress Bar */}
          <div className="pb-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10"></div>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full -z-10 transition-all duration-300"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              ></div>

              {steps.map((step) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;

                return (
                  <div key={step.id} className="flex flex-col items-center relative">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 z-10 ${
                        isActive
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : isCompleted
                            ? "bg-primary text-white"
                            : "bg-white text-gray-400 border-2 border-gray-200"
                      }`}
                    >
                      {isCompleted ? <Check size={16} /> : step.id}
                    </div>
                    <span
                      className={`text-xs font-medium mt-2 absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap ${isActive ? "text-primary" : "text-gray-500"}`}
                    >
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-24">
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 md:p-8">
          <Routes>
            <Route
              path="schedule"
              element={<StepSchedule provider={provider} />}
            />
            <Route
              path="address"
              element={<StepAddress provider={provider} />}
            />
            <Route
              path="payment"
              element={<StepPayment provider={provider} />}
            />
            <Route path="*" element={<StepSchedule provider={provider} />} />
          </Routes>
        </div>
      </div>
    </PageWrapper>
  );
};

export default BookingPage;
