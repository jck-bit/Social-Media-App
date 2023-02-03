import NextCors from 'nextjs-cors';
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/connection";

async function handler(req:NextApiRequest, res:NextApiResponse) {
   // Run the cors middleware
   // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
   await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
       
      GET: async (req:NextApiRequest, res:NextApiResponse) => {
        try {
           const {Post} = await connect()
    
           const posts = await Post.find().sort({createdAt :'ascending'}).select('*').lean()
           res.json(posts)
        } catch (error) {
           res.status(500).json({error})
        }
     }
    })

   res.json({ message: 'Hello NextJs Cors!' });
}

export default handler