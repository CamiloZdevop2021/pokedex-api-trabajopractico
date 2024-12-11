const express = require ('express');
const connectDB = require ('./config/db');
const authRoutes = require ('routes/authRoutes');
const pokemonRoutes = require ('./routes/pokemonRoutes');
const dotenv = ('dotenv');


// Carga las variables de entorno
dotenv.config ();

// Crea una instancia de express
const app = express ();

// Conecta a la base de datos
connectDB();

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Definir las rutas
app.use('/auth', authRoutes);
app.use('/pokemon', pokemonRoutes);

// Manejo de errores 
app.use((err, req, res, next)) => {
    console.error(err.stack);
    res.status(500).json({message:'Algo anda mal pokelover'});

}

// Configuración de puerto
const PORT = process.env.PORT || 5000; 

//Iniciar Servidor
app.listen (PORT, () => {
    console.log(`Server está andando ${PORT}`);
})