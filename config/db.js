const mongoose = require ('mongoose'); 
const dotenv = require ('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            userNewUrlParse: true,
            useUnifiedTopology: true,    
        });
        console.log('Conectado a MongoDB');
    } catch (error){
        console.error('Error de conexión a base de datos', error);
        process.exit(1);
    }

};

module.exports= connectDB;
