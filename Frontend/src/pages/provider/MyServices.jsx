import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Wrench,
} from "lucide-react";

import api from "../../api/api"; // path apne project ke hisab se change kar lena
const MyServices = () => {
  const [services, setServices] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  fetchServices();
}, []);



const fetchServices = async () => {
  try {
    const { data } = await api.get("/providers/services");

    setServices(data.data.services || []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


const handleDeleteService = async (serviceId) => {
  const ok = window.confirm(
    "Are you sure you want to delete this service?"
  );

  if (!ok) return;

  try {
    await api.delete(`/providers/services/${serviceId}`);

    await fetchServices();

    alert("Service deleted successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to delete service");
  }
};

const handleEditService = async (service) => {
  const serviceName = prompt(
    "Service Name",
    service.serviceName
  );

  if (!serviceName) return;

  const description = prompt(
    "Description",
    service.description
  );

  if (!description) return;

  const price = prompt(
    "Price",
    service.price
  );

  if (!price) return;

  try {
    await api.put(
      `/providers/services/${service._id}`,
      {
        serviceName,
        description,
        price: Number(price),
      }
    );

    await fetchServices();

    alert("Service updated successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to update service");
  }
};

const handleAddService = async () => {
  const serviceName = prompt("Service Name");

  if (!serviceName) return;

  const description = prompt("Description");

  if (!description) return;

  const price = prompt("Price");

  if (!price) return;

  try {
    await api.post("/providers/services", {
      serviceName,
      description,
      price: Number(price),
    });

    fetchServices();

    alert("Service Added Successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to add service");
  }
};

if (loading) {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <h2 className="text-2xl font-semibold">
        Loading Services...
      </h2>
    </div>
  );
}


  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            My Services
          </h1>

          <p className="mt-2 text-slate-500">
            Manage the services you provide.
          </p>
        </div>

       <button
  onClick={handleAddService}
  className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
>
          <Plus size={20} />
          Add Service
        </button>


      </div>

      {/* Services */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div
            key={service._id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <Wrench className="text-blue-600" size={26} />
              </div>

              {true ? (
                <ToggleRight
                  className="text-emerald-500"
                  size={34}
                />
              ) : (
                <ToggleLeft
                  className="text-slate-400"
                  size={34}
                />
              )}
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              {service.serviceName}
            </h2>

            <p className="mt-2 text-slate-500">
              Starting from
            </p>

            <h3 className="mt-1 text-3xl font-bold text-blue-600">
              ₹{service.price}
            </h3>

          <button
  onClick={() => handleEditService(service)}
  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3 font-medium text-slate-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
>
  <Pencil size={18} />
  Edit Service
</button>

<button
  onClick={() => handleDeleteService(service._id)}
 className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3 font-medium text-slate-700 transition hover:border-blue-600 hover:bg-red-400 hover:text-white"
>
  Delete Service
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServices;