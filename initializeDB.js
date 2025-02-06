const mongoose = require("mongoose");
require("dotenv").config(); // Cargar variables de entorno desde .env
const { DateModel, FoodModel, DessertModel, ActivityModel } = require("./routes"); // Importa los modelos

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://navarretemartinez503:dohM2EeeEP2bwP1Y@valentine.i8nk3.mongodb.net/?retryWrites=true&w=majority&appName=Valentine";
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log("Limpiando colecciones...");
    await DateModel.deleteMany();
    await FoodModel.deleteMany();
    await DessertModel.deleteMany();
    await ActivityModel.deleteMany();

    console.log("Insertando datos iniciales...");
    await DateModel.insertMany([{ date: "2025-02-14" }, { date: "2025-02-20" }]);
    await FoodModel.insertMany([{ food: "Pollo Frito" }, { food: "Hotdog" }]);
    await DessertModel.insertMany([{ dessert: "Smoothie" }, { dessert: "Crepa" }]);
    await ActivityModel.insertMany([{ activity: "Ir al metro" }, { activity: "Quedarse en casa" }]);

    console.log("Datos iniciales insertados correctamente");
  } catch (err) {
    console.error("Error insertando datos:", err);
  } finally {
    mongoose.connection.close(() => {
      console.log("Conexión a MongoDB cerrada");
    });
  }
};

const initialize = async () => {
  await connectDB();
  await seedDatabase();
};

initialize();
