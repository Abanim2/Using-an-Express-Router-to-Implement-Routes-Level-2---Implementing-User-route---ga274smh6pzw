// //Aim:Write a code to Update a product using Patch Request and  to delete a product using DELETE request

// const fs = require('fs');
// const express = require('express');
// const { object } = require('joi');
// const app = express();
// const router = new express.Router();
// const bodyParser = require('body-parser');

// //middleware
// router.use(express.json());
// router.use(bodyParser.json());

// const product = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/product.json`)
// );

// // Defining The Router
// // Handling PATCH request
// router.patch('/api/v1/product/:id', (req, res) => {
//   try {
//     //Write your code here
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: 'Product Updation Failed',
//       status: 'Error',
//     });
//   }
// });

// //Deleting Product
// router.delete('/api/v1/product/:id', (req, res) => {
//   try {
//     //Write your code here
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: 'Product Deletion Failed',
//       status: 'Error',
//     });
//   }
// });

// //Registering our Router
// app.use(router);

// module.exports = app;





const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

//middleware
router.use(express.json());
router.use(bodyParser.json());

// Defining The Router
// Handling PATCH request
router.patch('/api/v1/product/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const productData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/product.json`));
    const productIndex = productData.findIndex((item) => item.id === Number(productId));
    if (productIndex === -1) {
      return res.status(404).json({
        message: 'Product not found',
        status: 'Error',
      });
    }
    productData[productIndex] = {
      ...productData[productIndex],
      ...req.body,
      id: Number(productId),
    };
    fs.writeFileSync(`${__dirname}/../dev-data/product.json`, JSON.stringify(productData));
    res.status(200).json({
      message: 'Product updated successfully',
      data: {
        product: productData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Product updation failed',
      status: 'Error',
    });
  }
});

//Deleting Product
router.delete('/api/v1/product/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const productData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/product.json`));
    const productIndex = productData.findIndex((item) => item.id === Number(productId));
    if (productIndex === -1) {
      return res.status(404).json({
        message: 'Product not found',
        status: 'Error',
      });
    }
    productData.splice(productIndex, 1);
    fs.writeFileSync(`${__dirname}/../dev-data/product.json`, JSON.stringify(productData));
    res.status(200).json({
      message: 'Product deleted successfully',
      data: {
        product: productData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Product deletion failed',
      status: 'Error',
    });
  }
});

//Registering our Router
app.use(router);

module.exports = app;
