const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//MUST BE HERE Routes
const ProductsRoutes = require("./api/routes/products");
const OrdersRoutes = require("./api/routes/orders");
const UsersRoutes = require("./api/routes/users");

//OPTIONAL database
mongoose.connect("mongodb://localhost:27017/Academia-shop");
mongoose.Promise = global.Promise;

//MUST BE HERE Serve files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MUST BE HERE manage CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }

  next();
});

//MUST BE HERE Routes
app.use("/products", ProductsRoutes);
app.use("/orders", OrdersRoutes);
app.use("/", UsersRoutes);

//MUST BE HERE Handling errrors
app.use((res, req, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
