import { connectToDb } from "@utls/database";
import Prompt from "@models/prompt";

export const GET = async (req , {params}) => {
    try{    
        console.log("params=====",params)
        await connectToDb()
        const prompts = await Prompt.find({
            creator:params.id
        }).populate("creator")

        return new Response(JSON.stringify(prompts),{status:200})
    }catch(err){
        console.log(err)
        return new Response("Faliled to fetch promps",{status:500})
    }
}   