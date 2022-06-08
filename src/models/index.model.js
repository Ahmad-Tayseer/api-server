'use strcit';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const clothes = require('./clothes.model');
const food = require('./food.model');

const Collection = require('./collection.model');

const POSTGRES_URI = process.env.NODE_ENV === "test" ? 'sqlite:memory:' : process.env.DATABASE_URL;

const SequelizeOptions = process.env.NODE_ENV === "production" ? 
{
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
} : {};

const sequelize = new Sequelize(POSTGRES_URI, SequelizeOptions);

const clothesTable = clothes(sequelize, DataTypes);
const foodTable = food(sequelize, DataTypes);

const clothesCollection = new Collection(clothesTable);
const foodCollection = new Collection(foodTable);



module.exports = {
    db: sequelize,
    clothes: clothesCollection,
    food: foodCollection,
};