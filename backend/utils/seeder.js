const Animal = require('../models/animal');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const animals = require('../data/animals')

//Setting dotenv file
dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

const seedAnimals = async () => {
    try{
        await Animal.deleteMany();
        console.log('Animals are deleted');

        await Animal.insertMany(animals)
        console.log('All Animals are added');

        process.exit();

    }catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedAnimals()


