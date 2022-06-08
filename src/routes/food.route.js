'use strict';

const express = require('express');
const { food } = require('../models/index.model');
const foodRouter = express.Router();

foodRouter.get('/food', getFood);
foodRouter.get('/food/:id', getSpecificFood);
foodRouter.post('/food', addFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

async function getFood(req, res) {
    let allFood = await food.read();
    res.status(200).json(allFood);
}

async function getSpecificFood(req, res) {
    const foodId = parseInt(req.params.id);
    let specificFood = await food.read(foodId);
    res.status(200).json(specificFood);
}

async function addFood(req, res) {
    let newFood = req.body;
    let createdFood = await food.create(newFood);
    res.status(201).json(createdFood);
}

async function updateFood(req, res) {
    const foodId = parseInt(req.params.id);
    let newFood = req.body;
    let foundFood = await food.read(foodId);
    if (foundFood) {
        let updatedFood = await foundFood.update(newFood);
        res.status(201).json(updatedFood);
    }
}

async function deleteFood(req, res) {
    const foodId = parseInt(req.params.id);
    let deletedFood = food.delete(foodId);
    res.status(204).json({message: 'food deleted'});
}

module.exports = foodRouter;