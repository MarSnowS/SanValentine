const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dataRoutes = require("./routes/dataRoutes");

// Cargar variables de entorno
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
app.use(express.static(path.join(__dirname, "public")));

// Verificar si la variable de entorno está definida
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: La variable MONGO_URI no está definida en el entorno.");
  process.exit(1);
}

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1);
  });

// Rutas API
app.use("/api/data", dataRoutes);

// Ruta para servir los archivos HTML dinámicamente
app.get("/:page", (req, res) => {
  const pagePath = path.join(__dirname, "public", req.params.page);
  res.sendFile(pagePath, (err) => {
    if (err) res.status(404).send("Página no encontrada");
  });
});

// Ruta por defecto
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "date.html"));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
