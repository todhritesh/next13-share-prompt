import mongoose, { mongo } from "mongoose";

let isConnected = false

export const connectToDb = async () => {
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log('MOngodb is already connected')
        return
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI , {
            dbName:'SharePrompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log("Mongodb connected")
    }catch(err){
        console.log('in db connect err')
        console.log(err)
    }
}