import * as Yup from "yup";

const phoneRegExp = /^[6-9]\d{9}$/;
const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pincodeRegExp = /^\d{6}$/;

export const loginSchema = Yup.object().shape({
  identifier: Yup.string()
    .required("Email or Mobile is required")
    .test(
      "identifier-type",
      "Enter a valid email or 10-digit mobile number",
      (value) => {
        if (!value) return false;
        return phoneRegExp.test(value) || emailRegExp.test(value);
      }
    ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  mobile: Yup.string()
    .matches(phoneRegExp, "Mobile number must be a valid 10-digit Indian number")
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

export const addressSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name is required")
    .required("Full name is required"),

  mobile: Yup.string()
    .matches(phoneRegExp, "Enter valid mobile number")
    .required("Mobile number is required"),

  houseNo: Yup.string()
    .min(1, "House No is required")
    .required("House No is required"),

  area: Yup.string()
    .min(2, "Area is required")
    .required("Area is required"),

  landmark: Yup.string(),

  city: Yup.string()
    .min(2, "City is required")
    .required("City is required"),

  state: Yup.string()
    .min(2, "State is required")
    .required("State is required"),

  pincode: Yup.string()
    .matches(pincodeRegExp, "Pincode must be 6 digits")
    .required("Pincode is required"),
});


export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(phoneRegExp, "Mobile number must be a valid 10-digit Indian number")
    .required("Mobile number is required"),
});

export const bookingSchema = Yup.object().shape({
  serviceId: Yup.string().required("Service is required"),
  providerId: Yup.string().required("Provider is required"),
  date: Yup.date()
    .min(new Date(), "Date must be today or in the future")
    .required("Date is required"),
  timeSlot: Yup.string().required("Time slot is required"),
  addressId: Yup.string().required("Address is required"),
});

export const reviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5")
    .required("Rating is required"),
  comment: Yup.string()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review must be less than 500 characters")
    .required("Review comment is required"),
});
