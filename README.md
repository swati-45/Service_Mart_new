# 🏠 ServiceMart — > **A Full-Stack MERN Home Services Marketplace**

> A production-ready MERN Stack platform that connects customers with verified service providers for booking home services with secure payments and real-time notifications.

---

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Problem Statement](#-problem-statement)
- [Proposed Solution](#-proposed-solution)
- [Key Features](#-key-features)
- [Notification Workflow](#-real-time-notification-workflow)
- [Payment Workflow](#-payment-workflow)
- [Tech Stack](#-tech-stack)
- [Environment Variables](#-environment-variables)
- [Installation](#-Installation)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## Introduction

ServiceMart is a full-stack MERN application built to simplify the process of booking trusted home service professionals.

Instead of relying on local contacts or unverified workers, users can browse services, compare providers, schedule appointments, pay securely through **Razorpay**, and receive booking updates in **real time**.

The application follows a scalable client-server architecture with **JWT authentication, role-based authorization, MongoDB, Socket.IO, and REST APIs**.

---

## Problem Statement

Finding trustworthy home service professionals remains difficult in many cities.

Users often face:

- No centralized platform
- Unverified service providers
- Unclear pricing
- Manual booking process
- Cash-only payments
- No booking tracking
- No instant updates after booking

These issues create a poor customer experience and reduce trust.

## Proposed Solution

ServiceMart solves these challenges by providing a single platform where customers can

- Discover verified professionals
- Book services online
- Pay securely
- Track bookings
- Receive real-time notifications
- Rate completed services

At the same time, service providers get their own dashboard to manage bookings and services efficiently.

---

## Key Features

### 🔐 Authentication

- JWT Authentication
- Role Based Authorization
- Protected Routes
- Secure Password Hashing

### 👤 User Module

- Register/Login
- Browse Services
- View Service Details
- Book Services
- Booking History
- Payment Integration
- Retry Failed Payment
- Submit Reviews

### 🛠 Provider Module

- Provider Dashboard
- Create Service
- Update Service
- Delete Service
- Accept Bookings
- Reject Bookings
- Complete Bookings


### 🔔 Real-Time Notification System 

The notification system is powered by **Socket.IO** to deliver instant booking updates to service providers.

#### Highlights-

- Instant booking notification
- Provider-specific Socket rooms
- Notification Bell
- Unread badge
- Persistent notification storage in MongoDB
- Mark notification as read

### 💳 Secure Payments

Integrated *Razorpay Payment Gateway* with secure server-side verification.

#### Features

- Razorpay Order Creation
- Payment Signature Verification
- Payment Status Tracking
- Retry Failed Payments

---


## Real-Time Notification Workflow

      Customer Books Service
                │
                ▼
      Booking Created
                │
                ▼
      Notification Stored (MongoDB)
                │
                ▼
      Socket.IO emits event
                │
                ▼
      Provider joins room
                │
                ▼
      Notification Bell updates
                │
                ▼
      Provider marks notification as read

---

## Payment Workflow

      User Books Service
              │
              ▼
      Create Razorpay Order
              │
              ▼
      User Pays
              │
              ▼
      Signature Verification
              │
              ▼
      Booking Confirmed
              │
              ▼
      Provider Notification


---

## 🚀 Tech Stack

### Frontend

- React.js
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- Socket.IO Client
- Lucide React

---

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Socket.IO
- Razorpay
- Cloudinary
- Multer

---

### Development Tools

- Git & GitHub
- Postman
- VS Code
- npm
- MongoDB Compass

---

 ## 🗄 Database Management

- MongoDB Atlas
- Mongoose ODM
- Optimized Collection Relationships
- Efficient CRUD Operations

## ⚙ Installation

```bash
git clone https://github.com/swati-45/ServiceMart.git

cd ServiceMart

# Backend

cd Backend
npm install
npm run dev

# Frontend

cd ../Frontend
npm install
npm run dev
```

## 📈 Key Highlights

- Full Stack MERN Architecture
- Production-style Folder Structure
- Secure Authentication & Authorization
- Online Payment Integration
- Real-Time Notifications using Socket.IO
- Responsive User Interface
- RESTful API Design
- Scalable Backend Architecture

---

## 🔮 Future Improvements

- Real-Time Chat
- Email Notifications
- Admin Analytics Dashboard
- Google Maps Integration
- AI-Based Service Recommendations
- Advanced Search & Filters

---

### Environment Variables

Create `.env` files in both the `Backend` and `Frontend` directories:

#### Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 👨‍💻 Author

**Swati Gangwar**

B.Tech, Indian Institute of Technology (BHU), Varanasi

- 💼 Aspiring Software Development Engineer
- 💻 Passionate about Full-Stack Development & Data Structures
- 🌱 Currently building scalable MERN applications

---

Made with ❤️ using the MERN Stack by **Swati Gangwar**