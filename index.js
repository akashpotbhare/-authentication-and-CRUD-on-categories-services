const express = require('express');
require('dotenv').config();


const loginRegistrationController = require('./src/route/route');


const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());

// mount our routes
app.use('/api', loginRegistrationController);




app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    data: null
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});