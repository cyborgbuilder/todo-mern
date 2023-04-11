import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timesTamp: {
        type: String,
        default: Date.now()
    }
})

const Todo = mongoose.model("Todo", TodoSchema);

export default mongoose.model('content', TodoSchema)