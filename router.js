import express from 'express'
import Homeworks from './database.js'

const router = express.Router()

//@desc Create new homeworks
//@route POST /api/homeworks
router.post('/homeworks', async(req, res) => {
    try {
        
        const {course, title, due_date, status} = req.body

        const homeworks = new Homeworks({
            course,
            title,
            due_date,
            status,
        })

        const createdHomeworks = await homeworks.save()

        res.status(201).json(createdHomeworks)

    } catch (error) {
        
        console.log(error)
        res.status(500).json({ error: 'Database creation failed'})

    }
})


//@desc GET all homeworks
//@route GET /api/homeworks
router.get('/homeworks', async(req, res) => {
    const homeworks = await Homeworks.find({}) //kosong => if([]) =true

    if (homeworks && homeworks.length !== 0) {
        res.json(homeworks)

    }else {
        res.status(404).json({
            message: 'Homeworks not found'
        })
    }

})

//@desc Get Homework by id
//router GET /api/homeworks/:id
router.get('/homeworks/:id', async(req, res) => {

    const homework = await Homeworks.findById(req.params.id)

    if (homework) {
        res.json(homework)

    }else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }

})

//@desc update a homework
//@route GET /api/homeworks/:id
router.put('/homeworks/:id', async(req,res) => {

    const {course, title, due_date, status} = req.body

    const homework = await Homeworks.findById(req.params.id)

    if (homework) {
        homework.course = course;
        homework.title = title;
        homework.due_date = due_date;
        homework.status = status;

        const updateHomework = await homework.save()

        res.json(updateHomework)

    }else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }

})


//@desc Delete a homework
//@route DELETE /api/homeworks/:id
router.delete('/homeworks/:id', async(req, res) => {
    const homework = await Homeworks.findById(req.params.id)

    if(homework) {
        await homework.remove()
        res.json({
            message: 'Data removed'
        })

    }else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
})

export default router
