import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/connection";
import bcrypt from "bcrypt"
import { ResponseFuncs } from "@/utils/types";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
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
        
                const { username, email, password } = req.body;
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
        
                const newUser = new User({
                    username,
                    email,
                    password:passwordHash
                });
        
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
