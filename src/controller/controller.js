const model = require('../model/model');

const controller = {
    // Category Controllers
    createCategory: async (req, res) => {
        try {
            const { categoryName } = req.body;
            console.log(categoryName, "categoryName");

            if (!categoryName) {
                return res.status(400).json({
                    success: false,
                    message: 'Category name is required',
                });
            }

            const result = await model.createCategory(categoryName);
            console.log(result, "DB Response");

            if (!result) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to create category.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Category created successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in createCategory:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    getAllCategories: async (req, res) => {
        try {
            const result = await model.getAllCategories();
            console.log(result, "DB Response");

            return res.status(200).json({
                success: true,
                message: 'Categories retrieved successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in getAllCategories:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const { categoryName } = req.body;
            console.log(categoryId, "categoryId");
            console.log(categoryName, "categoryName");

            if (!categoryId || !categoryName) {
                return res.status(400).json({
                    success: false,
                    message: 'Category ID and name are required',
                });
            }

            const result = await model.updateCategory(categoryId, categoryName);
            console.log(result, "DB Response");

            if (!result) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to update category.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Category updated successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in updateCategory:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            console.log(categoryId, "categoryId");

            if (!categoryId) {
                return res.status(400).json({
                    success: false,
                    message: 'Category ID is required',
                });
            }

            const result = await model.deleteCategory(categoryId);
            console.log(result, "DB Response");

            if (!result) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to delete category.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Category deleted successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in deleteCategory:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    // Service Controllers
    addService: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const { serviceName, serviceType } = req.body;
            console.log(categoryId, "categoryId");
            console.log(serviceName, "serviceName");
            console.log(serviceType, "serviceType");

            if (!categoryId || !serviceName || !serviceType) {
                return res.status(400).json({
                    success: false,
                    message: 'Category ID, service name and type are required',
                });
            }

            if (!['Normal', 'VIP'].includes(serviceType)) {
                return res.status(400).json({
                    success: false,
                    message: 'Service type must be either Normal or VIP',
                });
            }

            const result = await model.addService(categoryId, serviceName, serviceType);
            console.log(result, "DB Response");

            if (!result) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to add service.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Service added successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in addService:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    getServicesByCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            console.log(categoryId, "categoryId");

            if (!categoryId) {
                return res.status(400).json({
                    success: false,
                    message: 'Category ID is required',
                });
            }

            const result = await model.getServicesByCategory(categoryId);
            console.log(result, "DB Response");

            return res.status(200).json({
                success: true,
                message: 'Services retrieved successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in getServicesByCategory:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    updateService: async (req, res) => {
        try {
            const { categoryId, serviceId } = req.params;
            const { serviceName, serviceType, priceOptions } = req.body;
            console.log(serviceId, "serviceId");
            console.log(serviceName, "serviceName");
            console.log(serviceType, "serviceType");

            if (!serviceId || !serviceName || !serviceType) {
                return res.status(400).json({
                    success: false,
                    message: 'Service ID, name and type are required',
                });
            }

            if (!['Normal', 'VIP'].includes(serviceType)) {
                return res.status(400).json({
                    success: false,
                    message: 'Service type must be either Normal or VIP',
                });
            }

            const result = await model.updateService(serviceId, serviceName, serviceType);
            console.log(result, "DB Response");

            if (!result) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to update service.',
                });
            }

            // Add price options if provided
            if (priceOptions && Array.isArray(priceOptions)) {
                for (let i = 0; i < priceOptions.length; i++) {
                    const option = priceOptions[i];
                    
                    // Validate required fields
                    if (!option.duration || !option.price || !option.priceType) {
                        return res.status(400).json({
                            success: false,
                            message: 'Each price option must have duration, price, and priceType',
                        });
                    }

                    // Validate price type
                    const validPriceTypes = ['Hourly', 'Weekly', 'Monthly'];
                    if (!validPriceTypes.includes(option.priceType)) {
                        return res.status(400).json({
                            success: false,
                            message: 'Price type must be Hourly, Weekly, or Monthly',
                        });
                    }

                    // Add the price option
                    await model.addPriceOption(serviceId, option.duration, option.price, option.priceType);
                }
            }

            return res.status(200).json({
                success: true,
                message: 'Service updated successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in updateService:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    deleteService: async (req, res) => {
        try {
            const { categoryId, serviceId } = req.params;
            console.log(serviceId, "serviceId");

            if (!serviceId) {
                return res.status(400).json({
                    success: false,
                    message: 'Service ID is required',
                });
            }

            const result = await model.deleteService(serviceId);
            console.log(result, "DB Response");

            if (!result) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to delete service.',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Service deleted successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in deleteService:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    // Price Options Controllers
    addPriceOption: async (req, res) => {
        try {
            const { serviceId } = req.params;
            const { duration, price, priceType } = req.body;

            if (!serviceId || !duration || !price || !priceType) {
                return res.status(400).json({
                    success: false,
                    message: 'Service ID, duration, price and price type are required',
                });
            }

            if (!['Hourly', 'Weekly', 'Monthly'].includes(priceType)) {
                return res.status(400).json({
                    success: false,
                    message: 'Price type must be Hourly, Weekly, or Monthly',
                });
            }

            const result = await model.addPriceOption(serviceId, duration, price, priceType);

            return res.status(200).json({
                success: true,
                message: 'Price option added successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in addPriceOption:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    getPriceOptionsByService: async (req, res) => {
        try {
            const { serviceId } = req.params;

            if (!serviceId) {
                return res.status(400).json({
                    success: false,
                    message: 'Service ID is required',
                });
            }

            const result = await model.getPriceOptionsByService(serviceId);

            return res.status(200).json({
                success: true,
                message: 'Price options retrieved successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in getPriceOptionsByService:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    updatePriceOption: async (req, res) => {
        try {
            const { priceOptionId } = req.params;
            const { duration, price, priceType } = req.body;

            if (!priceOptionId || !duration || !price || !priceType) {
                return res.status(400).json({
                    success: false,
                    message: 'Price option ID, duration, price and price type are required',
                });
            }

            if (!['Hourly', 'Weekly', 'Monthly'].includes(priceType)) {
                return res.status(400).json({
                    success: false,
                    message: 'Price type must be Hourly, Weekly, or Monthly',
                });
            }

            const result = await model.updatePriceOption(priceOptionId, duration, price, priceType);

            return res.status(200).json({
                success: true,
                message: 'Price option updated successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in updatePriceOption:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    deletePriceOption: async (req, res) => {
        try {
            const { priceOptionId } = req.params;

            if (!priceOptionId) {
                return res.status(400).json({
                    success: false,
                    message: 'Price option ID is required',
                });
            }

            const result = await model.deletePriceOption(priceOptionId);

            return res.status(200).json({
                success: true,
                message: 'Price option deleted successfully',
                data: result
            });

        } catch (error) {
            console.error('Error in deletePriceOption:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },
};

module.exports = controller;