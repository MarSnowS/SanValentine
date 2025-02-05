const mongoose = require("mongoose");

// Conexión a MongoDB
const MONGO_URI = "mongodb://localhost:27017/planificador"; // Cambia esta URI si usas MongoDB Atlas u otra configuración

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// Definir esquemas
const dateSchema = new mongoose.Schema({ date: String });
const foodSchema = new mongoose.Schema({ food: String });
const dessertSchema = new mongoose.Schema({ dessert: String });
const activitySchema = new mongoose.Schema({ activity: String });

// Crear modelos
const DateModel = mongoose.model("Date", dateSchema);
const FoodModel = mongoose.model("Food", foodSchema);
const DessertModel = mongoose.model("Dessert", dessertSchema);
const ActivityModel = mongoose.model("Activity", activitySchema);

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
    // Limpiar las colecciones existentes
    await DateModel.deleteMany();
    await FoodModel.deleteMany();
    await DessertModel.deleteMany();
    await ActivityModel.deleteMany();

    // Insertar datos iniciales
    await DateModel.insertMany(seedDates);
    await FoodModel.insertMany(seedFoods);
    await DessertModel.insertMany(seedDesserts);
    await ActivityModel.insertMany(seedActivities);

    console.log("Datos iniciales insertados correctamente");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error insertando datos:", err);
    mongoose.connection.close();
  }
};

seedDatabase();
