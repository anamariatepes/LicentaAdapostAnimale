const Adoption = require('../models/adoption');
const Animal = require ('../models/animal');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//Create new adoption => /api/v1/adoption/new
exports.newAdoption = catchAsyncErrors( async(req, res, next) => {
    const{
        userInfo,
        adoptionAnimals,
        adoptionInfo

    }= req.body;

    const adoption = await Adoption.create({
        userInfo,
        adoptionAnimals,
        adoptionInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(200).json({
        success: true,
        adoption
    })
})

// Get single adoption   =>   /api/v1/adoption/:id
exports.getSingleAdoption = catchAsyncErrors(async (req, res, next) => {
    const adoption = await Adoption.findById(req.params.id).populate('user', 'name email')

    if (!adoption) {
        return next(new ErrorHandler('No Adoption found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        adoption
    })
})
// Get logged in user orders   =>   /api/v1/adoptions/me
exports.myAdoptions = catchAsyncErrors(async (req, res, next) => {
    const adoptions = await Adoption.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        adoptions
    })
})
// Get all adoptions - ADMIN  =>   /api/v1/admin/adoptions/
exports.allOptions = catchAsyncErrors(async (req, res, next) => {
    const adoptions = await Adoption.find()


    res.status(200).json({
        success: true,
        adoptions
    })
})
// Update / Process adoption - ADMIN  =>   /api/v1/admin/order/:id
exports.updateAdoption = catchAsyncErrors(async (req, res, next) => {
    const adoption = await Adoption.findById(req.params.id)

    if (adoption.adoptionStatus === 'Completed') {
        return next(new ErrorHandler('You have already completed this adoption', 400))
    }

    
    adoption.adoptionStatus = req.body.status,
        adoption.deliveredAt = Date.now()

    await adoption.save()

    res.status(200).json({
        success: true,
    })
})

// Delete adoption   =>   /api/v1/admin/order/:id
exports.deleteAdoption = catchAsyncErrors(async (req, res, next) => {
    const adoption = await Adoption.findById(req.params.id)

    if (!adoption) {
        return next(new ErrorHandler('No Adoption found with this ID', 404))
    }

    await adoption.remove()

    res.status(200).json({
        success: true
    })
})