const express = require("express");
const courseController = require('../controllers/courseController.js')

const router = express.Router()

router.post('/add-course', courseController.addCourse)

router.get('/courses', courseController.getAllCourses)

router.get('/course/:id', courseController.getOneCourse)

router.put('/edit-course/:id', courseController.updateCourse)

router.get('/categories', courseController.getCoursesByCategoryId)

router.get('/courses/filter', courseController.getCoursesByFilter);

router.delete('/delete-course/:id', courseController.deleteCourse)

module.exports = router