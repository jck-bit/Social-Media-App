import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/connection";
import bcrypt from "bcrypt"
import { ResponseFuncs } from "@/utils/types";
import NextCors from "nextjs-cors";

const corsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
       methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
       origin: '*',
       optionsSuccessStatus: 200,
    });
 }

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
    await corsHandler(req, res)
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    const handleCase:ResponseFuncs ={
        GET:async(req:NextApiRequest, res:NextApiResponse) =>{
            try{
                const { User} = await connect() //connect to the database
                const users =  await User.find().lean()    
                if(!users.length){
                    return res.status(400).json({messsage:"No users available"})
                }
                return res.json(users)
            } catch(error){
                return res.status(500).json({error})
            }
        },
        POST:async (req:NextApiRequest, res:NextApiResponse) => {
            try {
                if (!req.body.username || !req.body.email || !req.body.password) {
                    return res.status(400).json({ error: "username, email and password are required" });
                }
                const { User } = await connect();
                
                const { username, email, password, image } = req.body;

                const user = await User.findOne({email}).lean()
                if(user) return res.status(400).json({message:"user with that email exists"})
                console.log('user exists')

                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
        
                const newUser = new User({
                    username,
                    email,
                    password:passwordHash,
                    image
                });

                if (!req.body.image){ 
                    newUser.image = "https://www.shutterstock.com/image-photo/building-background-hd-images-without-600w-1907638465.jpg" 
                   
                }else{
                    newUser.image = req.body.image
                }
        
                const savedUser = await newUser.save();
                res.status(201).json(savedUser);
        
            } catch (error) {
                res.status(500).json({ error });
            }
        }
    }

    const response = handleCase[method]
    if (response) response(req, res)
    else{
        res.status(405).json({error :"Method Not Allowed"})
    }
}

export default handler
