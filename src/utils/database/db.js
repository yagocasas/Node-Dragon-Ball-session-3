const mongoose = require ('mongoose');

//Ruta de la BBDD. Esta es local, podría ser la ruta de mongo atlas.
const DB_URL = 'mongodb://localhost:27017/bola-de-dragon';

//una pequeña comprobación. Pq más adelante cambiamos y sacaremos la url de otro lugar, y nos avisa.
if (!DB_URL) throw new Error('No se encuentra la URL a la base de datos');

//esta función, cuando la ejecute, es la responsable de establecer la conexión con la base de datos.
const connectDb = async () => {
    try {
        const db = await mongoose.connect(DB_URL);//va a recibir de argumento la url de la base de datos. 
        //con Santi le pasamos un objeto (useNewUrlParses y el unifinedTopology), probamos sin ellos
        const { name, host } = db.connection;
        //console.log(db);un objeto bastante grande, entre sus propiedades nos da el nombre de la base de datos y el host
        console.log(`Conectado con éxito a la db: ${name} en ${host}`);
    } catch (error) {
        console.log('Error conectando a la base de datos: ', error);
    }
};

module.exports = {
    connectDb, 
    DB_URL,
}

//db es para crear toda nuestra conexión con la base de datos
//mongoose genera un esquema. Todo lo que no cumpla ese esquema/plantilla, se queda fuera, es rechazado.
//lo primero que hago es instalar mongoose (npm install mongoose)