const express = require('express');
const mongoose = require('mongoose');
const DB_CONNECTION = require('./config').mongo;

// Server
const app = express();

// Database
mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log("DB connection error: ", err);
  console.log("We're connected to DB");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
const authRouter = require('./routes/auth');
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');

// Routes
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

// Disabling some response fields
app.disable("x-powered-by");

// Server listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server is up and running on http://localhost:${PORT}`);
})