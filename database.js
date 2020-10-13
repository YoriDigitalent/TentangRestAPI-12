import mongoose from 'mongoose'

const homeworksSchema = mongoose.Schema( {
    course: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
}
)

const Homeworks = mongoose.model('Homeworks', homeworksSchema)

export default Homeworks