const res = require('express/lib/response');
const Animal = require('../models/animal')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

//Create new profile => /api/v1/admin/product/new
exports.newAnimal = catchAsyncErrors (async(req, res, next) => {

    req.body.user = req.user.id;
    const animal = await Animal.create(req.body);

    res.status(201).json({
        success: true,
        animal
    })
})


//Get all animals => /api/v1/animals?keyword=buna
exports.getAnimals = catchAsyncErrors (async (req, res, next) => {
   
    const resPerPage = 8;
    const animalsCount = await Animal.countDocuments();

    const apiFeatures = new APIFeatures(Animal.find(), req.query)
                          .search()
                          .filter()
                          .pagination(resPerPage)

    const animals = await apiFeatures.query;

        res.status(200).json({
            success: true,
            animalsCount,
            resPerPage,
            animals
        })
  
})

//Get single animal details => api/v1/product:id


exports.getSingleAnimal = catchAsyncErrors (async (req, res, next) => {
    const animal = await Animal.findById(req.params.id);

    if(!animal){
        return next(new ErrorHandler('Animal not found.', 404));
    }
    res.status(200).json({
        success: true,
        animal
    })
})

//update Animal => /api/v1/admin/animal/:id

exports.updateAnimal = catchAsyncErrors (async (req, res, next) => {
    let animal = await Animal.findById(req.params.id);

    if(!animal){
        return next(new ErrorHandler('Animal not found.', 404));
    }
    animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        animal
    })

})
//Delete Animal => /api/v1/admin/product/:id
exports.deleteAnimal = catchAsyncErrors (async (req, res, next) => {
    const animal = await Animal.findById(req.params.id);

    if(!animal){
        return next(new ErrorHandler('Animal not found.', 404));
    }
    await animal.deleteOne();
   

    res.status(200).json({
        success: true,
        message: 'Animal is deleted.'
    })
})