import { connect } from "@/utils/connection";
import {  ResponseFuncs } from "@/utils/types";
import mongoose, { Document} from "mongoose";

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
        POST:async (req:NextApiRequest, res:NextApiResponse) => {
            try {
                if (!req.body.content || !req.body.userId) {
                    return res.status(400).json({ error: "All Fields Are required" });
                }

                const {Post, User} = await connect()
                const {content, userId} = req.body
                
                const user = await User.findById(userId)
                if(!user) res.status(400).json({message:"user does not exist"})

                const newPost = new Post({
                    userId,
                    username:user.username,
                    email:user.email,
                    content,
                    likes:{}
                })
                await newPost.save();
                const posts = await Post.find().select("*").lean();
                res.json(posts)
                res.status(201)

            } catch (error) {
                res.status(409).json({error})
            }
        }
    }
    const response = handleCase[method]
    if (response) response(req,res)
    else{
        res.status(405).json({error:"Method Not Allowed"})
    }
}

export default handler