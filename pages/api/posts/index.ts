import { connect } from "@/utils/connection";
import {  ResponseFuncs } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler =async (req:NextApiRequest, res:NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    const handleCase:ResponseFuncs ={
        GET:async (req:NextApiRequest, res:NextApiResponse) => {
            try {
                const {Post} = await connect()

                const posts = await Post.find().lean()
                res.json(posts)
                console.log(posts)
            } catch (error) {
                res.status(500).json({error})
            }
        },
        POST:async (req:NextApiRequest) => {
            
        }
    }
    const response = handleCase[method]
    if (response) response(req,res)
    else{
        res.status(405).json({error:"Method Not Allowed"})
    }
}

export default handler