const express = require('express')
const cors = require('cors')

// Import all our route files
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const providerRoutes = require('./routes/provider.routes')
const bookingRoutes = require('./routes/booking.routes')

const serviceRoutes = require('./routes/service.routes')
const addressRoutes = require("./routes/address.routes");
const paymentRoutes = require("./routes/paymentRoutes");
const notificationRoutes = require("./routes/notification.routes");

// Import error handler middleware
const { errorHandler } = require('./middlewares/error.middleware')

// Create express app
const app = express()

// ── MIDDLEWARES ──────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/addresses", addressRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/notifications", notificationRoutes);


// ── ROUTES ───────────────────────────────────────────
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>HomeFix API</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
          h1 { color: #333; }
          h2 { color: #666; margin-top: 20px; }
          ul { background: #f4f4f4; padding: 15px 30px; border-radius: 5px; }
          li { margin-bottom: 5px; }
          code { background: #e0e0e0; padding: 2px 5px; border-radius: 3px; font-weight: bold; color: #d63384; }
          .method-get { color: #0d6efd; }
          .method-post { color: #198754; }
          .method-put { color: #fd7e14; }
          .method-patch { color: #fd7e14; }
        </style>
      </head>
      <body>
        <h1>🛠️ HomeFix API is running!</h1>
        <p>Status: <strong>OK</strong> | Time: ${new Date().toISOString()}</p>
        
        <h2>Available API Routes:</h2>
        
        <h3>🔐 Authentication</h3>
        <ul>
          <li><code class="method-post">POST</code> /api/auth/signup - Create a new account</li>
          <li><code class="method-post">POST</code> /api/auth/login - Login to your account</li>
          <li><code class="method-get">GET</code> /api/auth/me - Get current logged-in user profile</li>
        </ul>
        
        <h3>👤 Users</h3>
        <ul>
          <li><code class="method-get">GET</code> /api/users/profile - Get user profile</li>
          <li><code class="method-put">PUT</code> /api/users/profile - Update user profile</li>
          <li><code class="method-get">GET</code> /api/users - Get all users (Admin only)</li>
        </ul>
        
        <h3>👷 Providers (Professionals)</h3>
        <ul>
          <li><code class="method-get">GET</code> /api/providers - Get all providers</li>
          <li><code class="method-get">GET</code> /api/providers/:id - Get specific provider by ID</li>
        </ul>
        
        <h3>📅 Bookings</h3>
        <ul>
          <li><code class="method-post">POST</code> /api/bookings - Create a new booking</li>
          <li><code class="method-get">GET</code> /api/bookings/my - Get user's bookings</li>
          <li><code class="method-get">GET</code> /api/bookings/:id - Get specific booking by ID</li>
          <li><code class="method-patch">PATCH</code> /api/bookings/:id/cancel - Cancel a booking</li>
        </ul>
        
        <h3>🔧 Services</h3>
        <ul>
          <li><code class="method-get">GET</code> /api/services - Get all available services</li>
          <li><code class="method-post">POST</code> /api/services - Add a new service (Admin only)</li>
        </ul>
      </body>
    </html>
  `)
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/providers', providerRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/services', serviceRoutes)

app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: `Route ${req.originalUrl} not found` 
  })
})

app.use(errorHandler)

module.exports = app
