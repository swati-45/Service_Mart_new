import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { MapPin, Plus } from "lucide-react";

import api from "../../api/api";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { addressSchema } from "../../utils/validators";
import { setBooking } from "../../store/slice/bookingSlice";
import { setLocal as setSession } from "../../utils/storage";

const StepAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentBooking =
    useSelector((state) => state.booking.currentBooking) || {};

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const res = await api.get("/addresses");

      const list = res.data.data || [];

      setAddresses(list);

      if (currentBooking.address?._id) {
        setSelectedAddress(currentBooking.address._id);
      } else if (list.length > 0) {
        const def =
          list.find((item) => item.isDefault) || list[0];

        setSelectedAddress(def._id);
      }
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Unable to load addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const proceedToPayment = (address) => {
    const bookingData = {
      ...currentBooking,
      address,
    };

    dispatch(setBooking(bookingData));

    setSession("ServiceMart_booking_progress", {
      currentBooking: bookingData,
      step: 3,
    });

    navigate("../payment");
  };

                          const handleDeleteAddress = async (id) => {
                          const ok = window.confirm(
                            "Are you sure you want to delete this address?"
                          );

                          if (!ok) return;

                          try {
                            await api.delete(`/addresses/${id}`);

                            const updated = addresses.filter(
                              (item) => item._id !== id
                            );

                            setAddresses(updated);

                            if (selectedAddress === id) {
                              if (updated.length > 0) {
                                setSelectedAddress(updated[0]._id);
                              } else {
                                setSelectedAddress("");
                              }
                            }
                          } catch (err) {
                            console.error(err);

                            alert(
                              err?.response?.data?.message ||
                                "Unable to delete address."
                            );
                          }
                        };
              const handleSetDefault = async (id) => {
                try {
                  await api.patch(`/addresses/${id}/default`);

                  const updated = addresses.map((item) => ({
                    ...item,
                    isDefault: item._id === id,
                  }));

                  setAddresses(updated);
                  setSelectedAddress(id);
                } catch (err) {
                  console.error(err);

                  alert(
                    err?.response?.data?.message ||
                    "Unable to set default address."
                  );
                }
              };




  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobile: "",
      houseNo: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },

    validationSchema: addressSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        setSaving(true);

        const res = await api.post("/addresses", {
          fullName: values.fullName,
          mobile: values.mobile,
          houseNo: values.houseNo,
          area: values.area,
          landmark: values.landmark,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
        });

        const newAddress = res.data.data;

        setAddresses((prev) => [newAddress, ...prev]);
        setSelectedAddress(newAddress._id);

        resetForm();
        setShowNewForm(false);

        proceedToPayment(newAddress);
      } catch (err) {
        console.error(err);

        alert(
          err?.response?.data?.message ||
            "Unable to save address."
        );
      } finally {
        setSaving(false);
      }
    },
  });

  const handleNext = () => {
    if (showNewForm) {
      formik.handleSubmit();
      return;
    }

    const address = addresses.find(
      (item) => item._id === selectedAddress
    );

    if (!address) {
      alert("Please select an address.");
      return;
    }

    proceedToPayment(address);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-lg font-semibold">
          Loading Addresses...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">

      <h3 className="text-xl font-bold flex items-center gap-2">
        <MapPin className="text-primary" />
        Service Location
      </h3>

      {!showNewForm ? (
        <div className="space-y-4">

          {addresses.length === 0 ? (

            <div className="rounded-xl border border-dashed p-8 text-center">

              <p className="text-gray-500">
                No saved addresses found.
              </p>

              <Button
                className="mt-5"
                onClick={() => setShowNewForm(true)}
              >
                <Plus size={18} />
                Add Address
              </Button>

            </div>

          ) : (

            <>
              {addresses.map((address) => (

                <div
                  key={address._id}
                  onClick={() =>
                    setSelectedAddress(address._id)
                  }
                  className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                    selectedAddress === address._id
                      ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary"
                  }`}
                >
                  <div className="flex items-start justify-between">

                    <div className="flex-1">

                      <div className="flex items-center gap-2">

                        <span
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            selectedAddress === address._id
                              ? "border-primary"
                              : "border-gray-400"
                          }`}
                        >
                          {selectedAddress === address._id && (
                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                          )}
                        </span>

                        <h4 className="font-semibold">
                          {address.fullName}
                        </h4>


                   {!address.isDefault && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetDefault(address._id);
                    }}
                    className="mt-1 inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
                  >
                   <span> ⭐Default</span>
                  </button>
                )}

                      </div>

                      <div className="mt-3 space-y-1 pl-6 text-sm text-gray-600 dark:text-blue-950">

                        <p>{address.houseNo}</p>

                        <p>{address.area}</p>

                        {address.landmark && (
                          <p>
                            Landmark : {address.landmark}
                          </p>
                        )}

                        <p>
                          {address.city}, {address.state}
                        </p>

                        <p>{address.pincode}</p>

                        <p className="font-medium">
                          {address.mobile}
                        </p>

                      </div>

                    </div>

                      <div className="ml-4">

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address._id);
                          }}
                          className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                        >
                          Delete
                        </button>

                      </div>

                  

                  </div>

                </div>

              ))}

              <button
                type="button"
                onClick={() => setShowNewForm(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-4 font-medium text-primary transition hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <Plus size={20} />
                Add New Address
              </button>
            </>
          )}

        </div>

      ) : (

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/40">

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >

          <Input
              id="fullName"
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fullName &&
                formik.errors.fullName
              }
            />

            <Input
              id="mobile"
              name="mobile"
              label="Mobile Number"
              placeholder="Enter mobile number"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.mobile &&
                formik.errors.mobile
              }
            />

            <Input
              id="houseNo"
              name="houseNo"
              label="House No / Flat / Building"
              placeholder="e.g. A-102, Green Residency"
              value={formik.values.houseNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.houseNo &&
                formik.errors.houseNo
              }
            />

            <Input
              id="area"
              name="area"
              label="Area / Street"
              placeholder="Area or Street"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.area &&
                formik.errors.area
              }
            />

            <Input
              id="landmark"
              name="landmark"
              label="Landmark (Optional)"
              placeholder="Nearby landmark"
              value={formik.values.landmark}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.landmark &&
                formik.errors.landmark
              }
            />

            <div className="grid grid-cols-2 gap-4">

              <Input
                id="city"
                name="city"
                label="City"
                placeholder="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.city &&
                  formik.errors.city
                }
              />

              <Input
                id="state"
                name="state"
                label="State"
                placeholder="State"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.state &&
                  formik.errors.state
                }
              />

            </div>

            <Input
              id="pincode"
              name="pincode"
              label="Pincode"
              placeholder="6-digit pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pincode &&
                formik.errors.pincode
              }
            />

            <div className="flex items-center justify-end gap-3 pt-2">

              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  formik.resetForm();
                  setShowNewForm(false);
                }}
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={formik.handleSubmit}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Address"}
              </Button>

            </div>

          </form>

        </div>

      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">

        <Button
          className="w-full"
          size="lg"
          onClick={handleNext}
          disabled={saving}
        >
          Proceed to Payment
        </Button>

      </div>

    </div>
  );
};

export default StepAddress;