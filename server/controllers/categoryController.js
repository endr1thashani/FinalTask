const db = require('../models')


const Category = db.category


const addCategory = async (req, res) => {

    let data = {
        name: req.body.name,
    }

    const category = await Category.create(data)
    res.status(200).send(category)
    console.log(category)

}


const getAllCategories = async (req, res) => {

    let categories = await Category.findAll({})
    res.status(200).send(categories)

}

const getOneCategory = async (req, res) => {

    let id = req.params.id
    let categories = await Category.findOne({ where: { id: id }})
    res.status(200).send(categories)

}


const updateCategory= async (req, res) => {

    let id = req.params.id

    const category = await Category.update(req.body, { where: { id: id }})

    res.status(200).send(category)
   

}

const deleteCategory = async (req, res) => {

    let id = req.params.id
    
    await Category.destroy({ where: { id: id }} )

    res.status(200).send('Category is deleted !')

}

module.exports = {
    addCategory,
    getAllCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
}