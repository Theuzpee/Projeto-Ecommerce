// server/src/routes/productRoutes.js

const express = require('express');
const router = express.Router();

// Importamos o nosso controller
const productController = require('../controllers/productController');

// Define a rota para GET /produtos
// Quando uma requisição GET chegar nesta rota, ela chamará a função getAllProducts
router.get('/', productController.getAllProducts);

// Define a rota para GET /produtos/:id
// O ':id' torna o ID um parâmetro dinâmico na URL
router.get('/:id', productController.getProductById);

// Exportamos o router para ser usado no nosso servidor principal
module.exports = router;