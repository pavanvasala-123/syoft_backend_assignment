const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/UserRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const Dbconnection = require("./DatabaseConnection/connection");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

Dbconnection();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
