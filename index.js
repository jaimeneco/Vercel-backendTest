import express from 'express';
import Router from 'express';

// --- inicio config.js --- //
import dotenv from 'dotenv';
dotenv.config(); // inicializar el doten
const PORT= process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost"
const NOMBRE = process.env.NOMBRE || "Mundo"
// --- fin config.js --- //

const app = express();


// Middlewares
app.use(express.json()); // Procesa el JSON body para leer con req.body()
app. use(express.urlencoded({extended: false})); // leer datos de urlEncoded con req.body()



// Contenido estático: (hay que replicarlo en vercel)
// app.use("origen", express.static)
app.use("/uploads", express.static('public/uploads'));
app.use("/web", express.static('public') );




app.get("/", (req, res, next) => {
    res.setHeader("Content-Type", "text/html");

    const landingHtml = `
        <h1>Hola ${NOMBRE}</h1>
        <h1>Bienvenidos a nuestro backend en Express</h1>
    `;
    res.send(landingHtml);  
})


// RUtas de mi API:
// --- routes/index.routes.js --- //
const router = Router();
router.get("/", (req, res, next) => {
    res.json({ message: "Bienvenidos a nuestra API v1"});
})

router.get("/users", (req, res, next) => {
    res.json({ message: "Ruta para obtener usuarios"});
})
// --- routes/index.routes.js --- //

app.use('/api/v1', router);

app.listen(3000, ()=> {
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
})