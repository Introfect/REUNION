require("dotenv").config();
const express = require("express")
const connectDB = require("./db/connect");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api", allRoutes);
// app.use(serverNotFound);

const port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URL);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));