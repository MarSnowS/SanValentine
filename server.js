  const express = require("express");
  const mongoose = require("mongoose");
  const dotenv = require("dotenv");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const path = require("path");
  const dataRoutes = require("./routes/dataRoutes");

  dotenv.config();

  const app = express();

  // Middleware
  app.use(cors({ 
  origin: ['https://MarSnowS.github.io', 'http://localhost:3000'],
  credentials: true 
}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Servir archivos estáticos
  app.use(express.static('public'));

  // MongoDB Connection
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

  // Routes
  app.use("/api/data", dataRoutes);

  // Ruta para servir los archivos HTML
  app.get('/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'public', page));
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'date.html'));
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
