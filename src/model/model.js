const db = require('../../DBconfig/dbConfig');

const model = {
    // Category operations
    createCategory: async (categoryName) => {
        try {
            const [rows] = await db.execute('CALL sp_insert_category(?)', [categoryName]);
            console.log(rows, "model DB Response");
            if (rows.length === 0 || rows[0].error_message) {
                throw new Error(rows[0]?.error_message || 'Failed to create category.');
            }
            return rows[0][0];
        } catch (error) {
            console.error('Error in createCategory:', error.message);
            throw error;
        }
    },

    getAllCategories: async () => {
        try {
            const [rows] = await db.execute('CALL sp_get_categories()');
            console.log(rows, "model DB Response");
            if (rows.length === 0) {
                return [];
            }
            return rows[0];
        } catch (error) {
            console.error('Error in getAllCategories:', error.message);
            throw error;
        }
    },

    updateCategory: async (categoryId, categoryName) => {
        try {
            const [rows] = await db.execute('CALL sp_update_category(?, ?)', [categoryId, categoryName]);
            console.log(rows, "model DB Response");
            if (rows.length === 0 || rows[0].error_message) {
                throw new Error(rows[0]?.error_message || 'Failed to update category.');
            }
            return rows[0][0];
        } catch (error) {
            console.error('Error in updateCategory:', error.message);
            throw error;
        }
    },

    deleteCategory: async (categoryId) => {
        try {
            const [rows] = await db.execute('CALL sp_delete_category(?)', [categoryId]);
            console.log(rows, "model DB Response");
            if (rows.length === 0 || rows[0].error_message) {
                throw new Error(rows[0]?.error_message || 'Failed to delete category.');
            }
            return rows[0][0];
        } catch (error) {
            console.error('Error in deleteCategory:', error.message);
            throw error;
        }
    },

    // Service operations
    addService: async (categoryId, serviceName, serviceType) => {
        try {
            const [rows] = await db.execute('CALL sp_add_service(?, ?, ?)', [categoryId, serviceName, serviceType]);
            console.log(rows, "model DB Response");
            if (rows.length === 0 || rows[0].error_message) {
                throw new Error(rows[0]?.error_message || 'Failed to add service.');
            }
            return rows[0][0];
        } catch (error) {
            console.error('Error in addService:', error.message);
            throw error;
        }
    },

    getServicesByCategory: async (categoryId) => {
        try {
            const [rows] = await db.execute('CALL sp_get_services_by_category(?)', [categoryId]);
            console.log(rows, "model DB Response");
            if (rows.length === 0) {
                return [];
            }
            return rows[0];
        } catch (error) {
            console.error('Error in getServicesByCategory:', error.message);
            throw error;
        }
    },

    updateService: async (serviceId, serviceName, serviceType) => {
        try {
            const [rows] = await db.execute('CALL sp_update_service(?, ?, ?)', [serviceId, serviceName, serviceType]);
            console.log(rows, "model DB Response");
            if (rows.length === 0 || rows[0].error_message) {
                throw new Error(rows[0]?.error_message || 'Failed to update service.');
            }
            return rows[0][0];
        } catch (error) {
            console.error('Error in updateService:', error.message);
            throw error;
        }
    },

    deleteService: async (serviceId) => {
        try {
            const [rows] = await db.execute('CALL sp_delete_service(?)', [serviceId]);
            console.log(rows, "model DB Response");
            if (rows.length === 0 || rows[0].error_message) {
                throw new Error(rows[0]?.error_message || 'Failed to delete service.');
            }
            return rows[0][0];
        } catch (error) {
            console.error('Error in deleteService:', error.message);
            throw error;
        }
    },

    // Price Options operations
    addPriceOption: async (serviceId, duration, price, priceType) => {
        try {
            const [rows] = await db.execute('CALL sp_add_price_option(?, ?, ?, ?)',
                [serviceId, duration, price, priceType]);
            console.log(rows, "model DB Response");
            if (rows.length === 0 || rows[0].error_message) {
                throw new Error(rows[0]?.error_message || 'Failed to add price option.');
            }
            return rows[0][0];
        } catch (error) {
            console.error('Error in addPriceOption:', error.message);
            throw error;
        }
    },

    getPriceOptionsByService: async (serviceId) => {
        try {
            const [rows] = await db.execute('CALL sp_get_price_options_by_service(?)', [serviceId]);
            console.log(rows, "model DB Response");
            if (rows.length === 0) {
                return [];
            }
            return rows[0];
        } catch (error) {
            console.error('Error in getPriceOptionsByService:', error.message);
            throw error;
        }
    },

    updatePriceOption: async (priceOptionId, duration, price, priceType) => {
        try {
            const [rows] = await db.execute('CALL sp_update_price_option(?, ?, ?, ?)',
                [priceOptionId, duration, price, priceType]);
            console.log(rows, "model DB Response");
            if (rows.length === 0 || rows[0].error_message) {
                throw new Error(rows[0]?.error_message || 'Failed to update price option.');
            }
            return rows[0][0];
        } catch (error) {
            console.error('Error in updatePriceOption:', error.message);
            throw error;
        }
    },

    deletePriceOption: async (priceOptionId) => {
        try {
            const [rows] = await db.execute('CALL sp_delete_price_option(?)', [priceOptionId]);
            console.log(rows, "model DB Response");
            if (rows.length === 0 || rows[0].error_message) {
                throw new Error(rows[0]?.error_message || 'Failed to delete price option.');
            }
            return rows[0][0];
        } catch (error) {
            console.error('Error in deletePriceOption:', error.message);
            throw error;
        }
    },
};

module.exports = model;