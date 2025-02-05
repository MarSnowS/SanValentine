const mongoose = require("mongoose");
require("dotenv").config(); // Cargar variables de entorno desde .env

// Conexión a MongoDB Atlas
const connectDB = async () => {
  try {
    const MONGO_URI =
      process.env.MONGO_URI ||
      "mongodb+srv://navarretemartinez503:dohM2EeeEP2bwP1Y@valentine.i8nk3.mongodb.net/?retryWrites=true&w=majority&appName=Valentine"; // Cambia esto si no tienes un archivo .env
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("Error conectando a MongoDB Atlas:", err);
    process.exit(1); // Finaliza el proceso si hay un error
  }
};

// Definir esquemas
const dateSchema = new mongoose.Schema({ date: String });
const foodSchema = new mongoose.Schema({ food: String });
const dessertSchema = new mongoose.Schema({ dessert: String });
const activitySchema = new mongoose.Schema({ activity: String });

// Crear modelos
const DateModel = mongoose.model("dates", dateSchema);
const FoodModel = mongoose.model("foods", foodSchema);
const DessertModel = mongoose.model("desserts", dessertSchema);
const ActivityModel = mongoose.model("activities", activitySchema);

// Datos iniciales
const seedDates = [{ date: "2025-02-14" }, { date: "2025-02-20" }];
const seedFoods = [
  { food: "Pollo Frito" },
  { food: "Hotdog" },
  { food: "Burrito" },
  { food: "Pizza" },
];
const seedDesserts = [
  { dessert: "Smoothie" },
  { dessert: "Crepa" },
  { dessert: "Helado" },
];
const seedActivities = [
  { activity: "Ir al metro" },
  { activity: "Quedarse en casa" },
];

// Insertar datos en las colecciones
const seedDatabase = async () => {
  try {
    console.log("Limpiando colecciones...");
    // Limpiar las colecciones existentes
    await DateModel.deleteMany();
    await FoodModel.deleteMany();
    await DessertModel.deleteMany();
    await ActivityModel.deleteMany();

    console.log("Insertando datos iniciales...");
    // Insertar datos iniciales
    await DateModel.insertMany(seedDates);
    await FoodModel.insertMany(seedFoods);
    await DessertModel.insertMany(seedDesserts);
    await ActivityModel.insertMany(seedActivities);

    console.log("Datos iniciales insertados correctamente");
  } catch (err) {
    console.error("Error insertando datos:", err);
  } finally {
    mongoose.connection.close(() => {
      console.log("Conexión a MongoDB cerrada");
    });
  }
};

// Ejecutar la inicialización de la base de datos
const initialize = async () => {
  await connectDB(); // Conectar a MongoDB Atlas
  await seedDatabase(); // Poblar la base de datos
};

initialize();
