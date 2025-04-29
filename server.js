require("dotenv").config();
const express = require("express");
const cors = require("cors");
const heroRoutes = require("./src/routes/heroRoutes");
const publisherRoutes = require("./src/routes/publisherRoutes");
const path = require("path");
const reportRoutes = require("./src/routes/reportRoutes");

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

app.use("/api", reportRoutes)
app.use("/api", heroRoutes);
app.use("/api", publisherRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
