import express from "express";
import productsRoutes from "./routes/products.routes.js";
import fileupload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./files",
  })
);

app.use(productsRoutes);

export default app;
