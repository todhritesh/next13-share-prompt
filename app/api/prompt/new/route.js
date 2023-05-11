import Prompt from "@models/prompt"
import { connectToDb } from "@utls/database"
export const POST = async (req , res) => {
    const {userId , prompt , tag} = await req.json()
    console.log({userId , prompt , tag})
    try{
        await connectToDb()
        const newPrompt = new Prompt({
            creator:userId,
            tag,
            prompt
        })
        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt),{status:201})
    }catch(err){
        console.log(err)
        return new Response("Falied To create new Prompt",{status:500})
    }
}