import { ResponseFuncs } from "@/utils/types";
import { NextApiRequest,NextApiResponse } from "next";
import { connect } from "@/utils/connection";


const handler =async (req:NextApiRequest, res:NextApiResponse) => {
    const catcher = (error: Error) => res.status(400).json({error})

    const id:string = req.query.id as string
    
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const handleCase:ResponseFuncs ={
        GET:async (req:NextApiRequest, res:NextApiResponse) => {
            try {

                const {User} = await connect()
                const user = await User.findById(id).catch(catcher)
                res.json(user)

            } catch (error) {
                res.status(404).json({error})
            }
        }
    }

    const response = handleCase[method]
    if(response) response(req,res)
    else res.status(400).json({error:"No response for this request"})
}

export default handler