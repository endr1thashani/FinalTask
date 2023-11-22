const db = require('../models')
const Course = db.course

const addCourse = async (req, res) => {
    try {

        let data = {
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category_id, 
            status: req.body.status,
            teacher: req.body.teacher,
            video_link: req.body.video_link,
        }

        const course = await Course.create(data);
        res.status(200).send(course);
        console.log(course);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllCourses = async (req, res) => {

    let courses = await Course.findAll({})
    res.status(200).send(courses)
}

const getOneCourse = async (req, res) => {

    let id = req.params.id
    let courses = await Course.findOne({ where: { id: id }})
    res.status(200).send(courses)
}

const updateCourse = async (req, res) => {

    let id = req.params.id

    const course = await Course.update(req.body, { where: { id: id }})

    res.status(200).send(course)
}

const getCoursesByCategoryId = async (req, res) => {
    try {
        const { category_id } = req.query;

        const courses = await Course.findAll({
            where: {
                category_id: category_id
            }
        });

        if (courses.length > 0) {
            res.status(200).json(courses);
        } else {
            res.status(404).json({ message: 'No courses found for the specified category' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const getCoursesByFilter = async (req, res) => {
    try {
        const { name, status } = req.query;

        const search = {};
        if (name) {
            search.name = name
        }

        if (status) {
            search.status = status;
        }
        const courses = await Course.findAll({ where: search });
        if (courses.length > 0) {
            res.status(200).json(courses);
        } else {
            res.status(404).json({ message: 'No courses found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteCourse = async (req, res) => {

    let id = req.params.id
    
    await Course.destroy({ where: { id: id }} )

    res.status(200).send('Course is deleted !')
}

module.exports = {
    addCourse,
    getAllCourses,
    getOneCourse,
    getCoursesByCategoryId,
    getCoursesByFilter,
    updateCourse,
    deleteCourse,
}
