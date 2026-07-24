import React, { useState } from 'react';
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, LogIn } from 'lucide-react';
import { loginSchema } from '../utils/validators';
import { setCredentials } from '../store/slice/authSlice';
import { showToast } from '../store/slice/uiSlice';
import { setLocal, getLocal } from '../utils/storage';
import PageWrapper from '../components/PageWrapper';
import Input from '../components/Input';
import Button from '../components/Button';
import socket from "../socket";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleGoogleSuccess = async (credentialResponse) => {
  try {
    setLoading(true);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/google`,
      {
        credential: credentialResponse.credential,
      }
    );

    const data = response.data.data;

    setLocal("homefix_user", data);
    setLocal("homefix_token", data.token);

    dispatch(
      setCredentials({
        user: data,
        token: data.token,
      })
    );

    console.log("Login User ID:", data._id);

//    if (!socket.connected) {
//   socket.connect();
// }

// socket.on("connect", () => {
//   console.log("Socket Connected:", socket.id);

//   // socket.emit("join", data._id);

//   console.log("Joined Room:", data._id);
// });

    dispatch(
      showToast({
        type: "success",
        message: "Google Login Successful",
      })
    );

    navigate("/");
  } catch (err) {
    dispatch(
      showToast({
        type: "error",
        message:
          err.response?.data?.message ||
          "Google Login Failed",
      })
    );
  } finally {
    setLoading(false);
  }
};

  const formik = useFormik({
    initialValues: { identifier: '', password: '' },
    validationSchema: loginSchema,


   onSubmit: async (values) => {
  setLoading(true);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        identifier: values.identifier,
        password: values.password,
      }
    );

    const data = response.data.data;

    setLocal("homefix_user", data);
    setLocal("homefix_token", data.token);

    dispatch(
      setCredentials({
        user: data,
        token: data.token,
      })
    );

    dispatch(
      showToast({
        type: "success",
        message: response.data.message,
      })
    );

    navigate("/");
  } catch (err) {
    dispatch(
      showToast({
        type: "error",
        message:
          err.response?.data?.message ||
          "Invalid email or password",
      })
    );
  } finally {
    setLoading(false);
  }
},


  });

  return (
    <PageWrapper title="Login" className="flex items-center justify-center p-4 bg-[#fafafa]">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100">
        
        <div className="p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl font-bold text-2xl mb-4">H</Link>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Log in to manage your bookings</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <Input
              id="identifier"
              name="identifier"
              type="text"
              label="Email or Mobile Number"
              placeholder="Enter email or mobile"
              leftIcon={<Mail size={18} />}
              value={formik.values.identifier}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.identifier && formik.errors.identifier}
            />

            <div>
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                leftIcon={<Lock size={18} />}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
              />
              <div className="flex justify-end mt-1">
                <a href="#" className="text-xs text-primary hover:text-blue-600 font-medium">Forgot password?</a>
              </div>
            </div>

            <Button type="submit" className="w-full" loading={loading} disabled={!formik.isValid || !formik.dirty}>
              Log in
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </div>
          
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
           <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                      dispatch(
                        showToast({
                          type: "error",
                          message: "Google Login Failed",
                        })
                      );
                    }}
                    useOneTap={false}
                  />
                </div>
            <p className="text-center text-xs text-gray-500 mt-6">
              Are you a professional? <Link to="/provider/join" className="text-primary font-medium">Join here</Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
