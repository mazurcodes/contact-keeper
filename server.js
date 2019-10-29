const express = require('express');
const path = require('path');
const connectDB = require('./config/db');


// Server
const app = express();

// Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routers
const authRouter = require('./routes/auth');
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');

// Routes
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

// Serve static assets in production
// check if we are in production mode
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  } )
}

// Disabling some response fields
app.disable("x-powered-by");

// Server listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>  console.log(`Server is up and running on http://localhost:${PORT}`))