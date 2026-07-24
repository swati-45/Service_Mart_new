import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import ProviderCard from "../components/ProviderCard";
import Input from "../components/Input";
import Button from "../components/Button";
import Skeleton from "../components/Skeleton";
import EmptyState from "../components/EmptyState";
// import { providerService } from "../api/providerService";
import useDebounce from "../hooks/useDebounce";
import api from "../api/api";

const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);

  // Sync query state with URL search params (for back/forward navigation)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q !== query) {
      setQuery(q);
    }
  }, [searchParams]);

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    minRating: 0,
    availability: "",
  });

  useEffect(() => {
  
  
    const fetchProviders = async () => {
  setLoading(true);

  try {
    const { data } = await api.get("/providers");

    const providers = data.data.providers.map((provider) => ({
      id: provider._id,
      name: provider.user.name,
      trade: provider.trade,
      city: provider.city,
      rating: provider.rating,
      reviews: provider.totalReviews,
      experience: provider.experience,
      isVerified: provider.verification.homefixCertified,
      priceMenu: provider.priceMenu,
    }));

    setProviders(providers);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

    fetchProviders();
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  // Filter Logic
  let filteredProviders = providers;
  if (debouncedQuery) {
    const lowerQ = debouncedQuery.toLowerCase();
    filteredProviders = filteredProviders.filter(
      (p) =>
        p.trade.toLowerCase().includes(lowerQ) ||
        p.name.toLowerCase().includes(lowerQ) ||
        p.city.toLowerCase().includes(lowerQ),
    );
  }
  if (filters.category) {
    filteredProviders = filteredProviders.filter(
      (p) => p.trade === filters.category,
    );
  }
  if (filters.minRating > 0) {
    filteredProviders = filteredProviders.filter(
      (p) => p.rating >= filters.minRating,
    );
  }

  return (
    <PageWrapper title="Find Professionals">
      <div className="bg-primary pb-24 pt-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Find Expert Professionals
          </h1>
          <div className="max-w-2xl mx-auto relative mb-6">
            <input
              type="text"
              placeholder="Search by service, professional name, or city..."
              className="w-full pl-12 pr-4 py-4 rounded-xl shadow-lg border-0 focus:ring-4 focus:ring-blue-300 bg-white outline-none text-gray-900"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={24}
            />
          </div>
          <div className="text-center">
            <p className="text-blue-100 font-medium">
              {loading
                ? "Searching..."
                : `${filteredProviders.length} Professionals found`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-10 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6 border-b pb-4">
                <SlidersHorizontal size={20} className="text-gray-500" />
                <h3 className="font-semibold text-lg">Filters</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    className="w-full rounded-lg border-gray-300 bg-white text-sm focus:ring-primary focus:border-primary px-3 py-2 border"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                  >
                    <option value="">All Categories</option>
                   {Array.from(
  new Set(providers.map((p) => p.trade))
).map(
                      (cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          className="text-primary focus:ring-primary"
                          checked={filters.minRating === rating}
                          onChange={() =>
                            setFilters({ ...filters, minRating: rating })
                          }
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {rating}+ Stars
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center mt-2">
                      <input
                        type="radio"
                        name="rating"
                        className="text-primary focus:ring-primary"
                        checked={filters.minRating === 0}
                        onChange={() =>
                          setFilters({ ...filters, minRating: 0 })
                        }
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Any Rating
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-64" variant="card" />
                ))}
              </div>
            ) : filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No professionals found"
                description="Try adjusting your search criteria or filters to find what you're looking for."
                action={
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery("");
                      setFilters({
                        category: "",
                        minRating: 0,
                        availability: "",
                      });
                    }}
                  >
                    Clear Filters
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ServicesPage;
