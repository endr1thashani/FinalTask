const express = require("express");
const categoryController = require('../controllers/categoryController.js')


const router = express.Router()

router.post('/add-category', categoryController.addCategory)

router.get('/categories', categoryController.getAllCategories)

router.get('/category/:id', categoryController.getOneCategory)

router.put('/edit-category/:id', categoryController.updateCategory)

router.delete('/delete-category/:id', categoryController.deleteCategory)

module.exports = router