const express = require('express');
const { verifyToken } = require('../Midilware/verifyToken');

const loginRegistrationController = require('../controller/loginregistration.controller');
const controller = require('../controller/controller');
const router = express.Router();

// Authentication routes 
router.post('/register', loginRegistrationController.createUser);

router.post('/login', loginRegistrationController.userLogin);

// Category routes 
router.post('/category', verifyToken, controller.createCategory);
router.get('/categories', verifyToken, controller.getAllCategories);
router.put('/category/:categoryId', verifyToken, controller.updateCategory);
router.delete('/category/:categoryId', verifyToken, controller.deleteCategory);


// Service routes 
router.post('/category/:categoryId/service', verifyToken, controller.addService);
router.get('/category/:categoryId/services', verifyToken, controller.getServicesByCategory);
router.put('/category/:categoryId/service/:serviceId', verifyToken, controller.updateService);
router.delete('/category/:categoryId/service/:serviceId', verifyToken, controller.deleteService);

// Price Options routes 
router.post('/service/:serviceId/price-option', verifyToken, controller.addPriceOption);
router.get('/service/:serviceId/price-options', verifyToken, controller.getPriceOptionsByService);
router.put('/price-option/:priceOptionId', verifyToken, controller.updatePriceOption);
router.delete('/price-option/:priceOptionId', verifyToken, controller.deletePriceOption);

module.exports = router;
