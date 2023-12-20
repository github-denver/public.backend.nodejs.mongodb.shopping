const express = require("express");
const connect = require("./configs/connect");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.set("port", process.env.PORT || 4000);

const user = require("./routes/user.route");
const product = require("./routes/product.route");
const productCategory = require("./routes/product.category.route");
const brand = require("./routes/brand.route");
const color = require("./routes/color.route");

const { notFound, error } = require("./middlewares/error.middleware");

connect();

app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/user", user);
app.use("/api/product/category", productCategory);
app.use("/api/product", product);
app.use("/api/brand", brand);
app.use("/api/color", color);

app.use(notFound);
app.use(error);

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});
