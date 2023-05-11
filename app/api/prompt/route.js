import { connectToDb } from "@utls/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try{
        await connectToDb()

        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts),{status:200})
    }catch(err){
        console.log(err)
        return new Response("Failded to fetch promps",{status:500})
    }
}