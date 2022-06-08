'use strict';

const express = require('express');
const { clothes } = require('../models/index.model');
const clothesRouter = express.Router();

clothesRouter.get('/clothes', getClothes);
clothesRouter.get('/clothes/:id', getSpecificClothes);
clothesRouter.post('/clothes', addClothes);
clothesRouter.put('/clothes/:id', updateClothes);
clothesRouter.delete('/clothes/:id', deleteClothes);

async function getClothes(req, res) {
    let allClothes = await clothes.read();
    res.status(200).json(allClothes);
}

async function getSpecificClothes(req, res) {
    const clothesId = parseInt(req.params.id);
    let specificClothes = await clothes.read(clothesId);
    res.status(200).json(specificClothes);
}

async function addClothes(req, res) {
    const newClothes = req.body;
    let createdClothes = await clothes.create(newClothes);
    res.status(201).json(createdClothes);
}

async function updateClothes(req, res) {
    const clothesId = parseInt(req.params.id);
    const newClothes = req.body;
    let foundClothes = await clothes.read(clothesId);
    if (foundClothes) {
        let updatedClothes = await foundClothes.update(newClothes);
        res.status(201).json(updatedClothes);
    }
}

async function deleteClothes(req, res) {
    const clothesId = parseInt(req.params.id);
    let deletedClothes = await clothes.delete(clothesId);
    res.status(204).json({message: 'clothes deleted'});
}

module.exports = clothesRouter;