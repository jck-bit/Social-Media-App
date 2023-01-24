import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/connection";
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
    }

    const response = handleCase[method]
    if (response) response(req, res)
    else{
        res.status(405).json({error :"Method Not Allowed"})
    }
}

export default handler
