import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  MapPin,
  Star,
  ThumbsUp,
  CalendarClock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import Skeleton from "../components/Skeleton";
import Button from "../components/Button";
import Badge from "../components/Badge";
import StarRating from "../components/StarRating";
import { REVIEWS } from "../utils/constants";
import api from "../api/api";


// import { providerService } from "../api/providerService";
// import { REVIEWS, PROVIDERS } from "../utils/constants";

const ProviderProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      try {
        // Mocking provider fetch since providerService is missing
        await new Promise(resolve => setTimeout(resolve, 800));
         const { data } = await api.get(`/providers/${id}`);

         console.log("API Response:", data.data.provider);
      console.log("Price Menu:", data.data.provider.priceMenu);


setProvider(data.data.provider);
console.log(data.data.provider);


      } catch (error) {
        console.error("Failed to fetch provider:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchProvider();
  }, [id, navigate]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
          <Skeleton className="h-48" variant="card" />
          <Skeleton className="h-64" variant="card" />
        </div>
      </PageWrapper>
    );
  }

  

  if (!provider) {
    return (
      <PageWrapper>
        <div className="max-w-4xl mx-auto p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Provider not found</h2>
          <Button onClick={() => navigate("/services")}>
            Back to Services
          </Button>
        </div>
      </PageWrapper>
    );
  }

  console.log("Provider:", provider);
console.log("Price Menu:", provider?.priceMenu); 

  return (
    <PageWrapper title={`${provider.user?.name} - ${provider.trade}`}>
      {/* Header Profile */}
      <div className="bg-primary pb-24 pt-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-1 px-3 py-1.5 -ml-3 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-all group mb-4"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-primary flex-shrink-0">
             {provider.user?.name?.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
                    {provider.user?.name}
                    {provider.verification?.servicemartCertified && (
                      <ShieldCheck className="text-green-500 w-6 h-6" />
                    )}
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">
                    {provider.trade}
                  </p>
                </div>
                {provider.verification?.servicemartCertified && (
                  <Badge variant="success" className="px-3 py-1">
                    Verified Professional
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 mb-6 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {provider.city}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />{" "}
                  {provider.rating} ({provider.totalReviews} reviews)
                </span>
                <span>•</span>
                <span>{provider.experience} years experience</span>
              </div>

              {/* Fix Price Menu preview inside component if needed */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="gray">Home Repair</Badge>
                <Badge variant="gray">Installation</Badge>
                <Badge variant="gray">Maintenance</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border-t border-gray-200 bg-gray-50">
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {provider.rating}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                User Rating
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {provider.totalReviews}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Total Reviews
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {provider.experience}+
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Years Exp.
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {provider.onTimePercent}%
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                On-Time
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Fixed Price Menu */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                <span>Fixed Price Menu</span>
                <Badge variant="info">Transparent</Badge>
              </h3>
              <div className="space-y-4">
                {provider.priceMenu &&
                  provider.priceMenu.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 border-b last:border-0 border-dashed"
                    >
                      <span className="font-medium text-gray-800">
                        {item.serviceName}
                      </span>
                      <span className="font-bold text-gray-900">
                        ₹{item.price}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Verifications Checklist */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-4">Verifications & Trust</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                  <ShieldCheck className="text-green-500 shrink-0" size={20} />
                  <span className="text-sm font-medium text-green-900">
                    Identity Verified
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                  <ShieldCheck className="text-green-500 shrink-0" size={20} />
                  <span className="text-sm font-medium text-green-900">
                    Background Checked
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                  <ShieldCheck className="text-green-500 shrink-0" size={20} />
                  <span className="text-sm font-medium text-green-900">
                    Skill Tested
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                  <ShieldCheck className="text-green-500 shrink-0" size={20} />
                  <span className="text-sm font-medium text-green-900">
                    ServiceMart Certified
                  </span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {REVIEWS.map((rev) => (
                  <div
                    key={rev.id}
                    className="pb-6 border-b last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-gray-900">
                        {rev.reviewer}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(rev.date).toLocaleDateString()}
                      </div>
                    </div>
                    <StarRating rating={rev.rating} size={14} />
                    <p className="mt-2 text-gray-600 text-sm">
                      {rev.text}
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Reviews
              </Button>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-4">
                <CalendarClock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Ready to book?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Schedule {provider.user?.name?.split(" ")[0]} for your service today.
              </p>
              <Button
  size="lg"
  className="w-full"
  rightIcon={<ChevronRight size={20} />}
  onClick={() => {
    console.log("Provider Object:", provider);
    console.log("provider._id:", provider?._id);
    console.log("provider.id:", provider?.id);

    navigate(`/book/${provider?._id}/schedule`);
  }}
>
  Book Now
</Button>

              <div className="mt-6 flex flex-col gap-2 w-full text-left text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-green-500" /> Secure
                  Payment
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp size={16} className="text-blue-500" /> Quality
                  Assured
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProviderProfilePage;
