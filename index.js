const express =require('express');
const db = require('./src/utils/database/db');
const indexRoutes = require('./src/api/index/index.routes');
const characterRoutes = require('./src/api/characters/characters.routes');

db.connectDb();

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/', indexRoutes);//todo el que empiece normal -> me busque en index.routes
server.use('/characters',characterRoutes);//Para todo prefijo que empiece por /characters-> quiero que lo busques en esta ruta o en este router

server.listen(PORT, () => {
    console.log(`Servidor fucando a tope en https://localhost:${PORT}`);
});