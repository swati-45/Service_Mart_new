import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {
  Camera,
  CreditCard,
  HeartHandshake,
  History,
  LogOut,
  MapPin,
  Shield,
  Star,
  Wallet,
  Plus,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { getLocal } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import Button from "../components/Button";
import FileUpload from "../components/FileUpload";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";
import { showToast } from "../store/slice/uiSlice";
import { setCredentials } from "../store/slice/authSlice";
import { profileSchema } from "../utils/validators";
import { setLocal } from "../utils/storage";


const UserProfilePage = () => {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    },
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
    
    
    
  try {
 

const token = getLocal("homefix_token");

  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/users/profile`,
    {
      name: values.name,
      mobile: values.mobile,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const updatedUser = response.data.data.user;

  dispatch(
    setCredentials({
      user: updatedUser,
      token,
    })
  );

  setLocal("homefix_user", updatedUser);

  dispatch(
    showToast({
      type: "success",
      message: "Profile Updated Successfully",
    })
  );

  setIsEditing(false);
} catch (error) {
  dispatch(
    showToast({
      type: "error",
      message:
        error.response?.data?.message ||
        "Failed to update profile",
    })
  );
}



    },
  });



  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <PageWrapper title="My Profile" className="bg-[#fafafa]">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 pb-32 pt-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
        <div className="max-w-4xl mx-auto flex items-center gap-6 relative z-10">
         
         <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.15)] border-4 border-white/30 flex items-center justify-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-primary">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>

          <div className="text-white">
            <h1 className="text-3xl font-bold">{user?.name || "User"}</h1>
            <p className="text-blue-100 flex items-center gap-4 mt-2">
              <span>{user?.email || "user@example.com"}</span>
              <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
              <span>{user?.mobile || "+91 9876543210"}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            <Card padding="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Personal Information</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>

              {isEditing ? (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && formik.errors.name}
                  />
                  <Input
                    id="mobile"
                    name="mobile"
                    type="text"
                    label="Mobile Number"
                    placeholder="9876543210"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.mobile && formik.errors.mobile}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="john@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email}
                  />
                  <div>
                    <FileUpload
                      label="Profile Picture"
                      maxSizeMB={2}
                      onUploadComplete={() =>
                        dispatch(
                          showToast({
                            type: "success",
                            message: "Picture uploaded",
                          }),
                        )
                      }
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        formik.resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" loading={formik.isSubmitting}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b dark:border-gray-700 pb-4">
                    <span className="text-gray-500">Full Name</span>
                    <span className="font-medium">
                      {user?.name || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b dark:border-gray-700 pb-4">
                    <span className="text-gray-500">Email Address</span>
                    <span className="font-medium">
                      {user?.email || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="text-gray-500">Mobile Number</span>
                    <span className="font-medium">
                      {user?.mobile || "Not provided"}
                    </span>
                  </div>
                </div>
              )}
            </Card>

            <Card padding="p-0" className="overflow-hidden">
              <div className="divide-y dark:divide-gray-700">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-primary" size={20} />{" "}
                    <span className="font-medium">Saved Addresses</span>
                  </div>
                  <span className="text-sm bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                    2
                  </span>
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <History className="text-blue-500" size={20} />{" "}
                    <span className="font-medium">Booking History</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-yellow-500" size={20} />{" "}
                    <span className="font-medium">Payment Methods</span>
                  </div>
                </button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card
              padding="p-6"
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Wallet size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-300 text-sm">
                    HomeFix Wallet
                  </h3>
                  <div className="text-2xl font-bold text-white">₹0</div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-sm mt-2"
              >
                <Plus size={18} className="mr-2" />
                Add Money
              </Button>
            </Card>

            <Card padding="p-0">
              <div className="divide-y dark:divide-gray-700">
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left">
                  <HeartHandshake className="text-rose-500" size={18} />
                  <span className="font-medium">Offers & Referrals</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left">
                  <Shield className="text-green-500" size={18} />
                  <span className="font-medium">Quality Guarantee</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left">
                  <Star className="text-yellow-400 fill-yellow-400" size={18} />
                  <span className="font-medium">Rate the App</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left text-red-600 dark:text-red-400"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UserProfilePage;
