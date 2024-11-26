import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();

routes(app);

// configuring static files
app.use(express.static("uploads"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});