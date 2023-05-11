import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDb } from "@utls/database";
import User from "@models/user";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({session}){
            try{
                await connectToDb()
                const sessionUser = await User.findOne({
                    email:session.user.email
                })

                session.user.id = sessionUser?._id.toString()

                return session
            }catch(err){
                console.log("in session err")
                console.log(err)
            }
        } , 
        async signIn({profile}){
            try{
                await connectToDb()

                // check if user exits
                const userExists = await User.findOne({
                    email:profile.email
                });
                // if user not exists
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                    })
                }

                return true

            }catch(err){
                console.log(err,"in signin err")
                return false
            }
        }
    }
})


export {
    handler as GET , handler as POST
}