import {models , mode , Schema, model} from 'mongoose'

const promptSchema = new Schema({
    prompt:{
        required:[true,"Prompt is required"],
        type:String
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    tag:{
        required:[true,"Tag is required"],
        type:String
    }
})

const Prompt = models.Prompt || model('Prompt',promptSchema)
export default Prompt