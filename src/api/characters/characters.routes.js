const express = require('express');
const Character = require('./characters.model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allCharacters = await Character.find();
        console.log(allCharacters);
        return res.status(200).json(allCharacters);
    } catch (error) {
        return res.status(500).json('Error en el servidor');

    }
});

router.get('/:id', async (req, res) => { //no accede al resultado buscando por id
    try {
        const id = req.params.id;
        let characterToFind = await Character.findById(id);
        console.log(characterToFind);
        return res.status(200).json(characterToFind);
    } catch (error) {
        console.log('error', error);
        return res.status(500).json('No se encontró el personaje');
    }
});

router.post('/create', async (req, res) => {
    try {
        const character = req.body;//es la request(que es un objeto súper grande), body es uno de los parámetros de
        // ese objeto tan grande
        const newCharacter = new Character(character);//no funcionaba porque new Character lo tenía sin espacio
        const created = await newCharacter.save();//guarda el nuevo personaje en la base de datos, el .save
        return res.status(201).json(created);//lo devolvemos como una respuesta
    } catch (error) {
        return res.status(500).json('Error al crear el personaje');
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let characterToDelete = await Character.findByIdAndDelete(id);
        return res.status(200).json('Se ha conseguido borrar el personaje');
    } catch (error) {
        return res.status(500).json('Error al eliminar el personaje');
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const character = req.body;
        const characterModify = new Character(character);
        characterModify._id = id;
        const characterUpdated = await Character.findByIdAndUpdate(id, characterModify);
        return res.status(200).json({mensaje: 'Se ha conseguido editar el personaje', characterModificado: characterUpdated });
    } catch (error) {
        return res.status(500).json('Error al editar el personaje');
    }
})

module.exports = router;