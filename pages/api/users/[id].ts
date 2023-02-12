import { ResponseFuncs, User } from "@/utils/types";
import { NextApiRequest,NextApiResponse } from "next";
import { connect } from "@/utils/connection";

const handler =async (req:NextApiRequest, res:NextApiResponse) => {
    
    const catcher:any = (error: Error) => {
         res.status(400).json({error});
        }

    const id:string = req.query.id as string
    const friendId:string = req.query.id as string
    
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const handleCase:ResponseFuncs ={

        GET:async (req:NextApiRequest, res:NextApiResponse) => {
            try {
                const {User} = await connect()
              
                const user = await User.findById(id).catch(catcher)
                
                if (user) {
                    res.status(200).json(user);
                }
            } catch (error) {
                res.status(404).json({error});
                
            }
        },

        PATCH:async (req:NextApiRequest, res:NextApiResponse) => {
            try {
                

                const {User} = await connect()
                const user = await User.findById(id)
                const friend = await User.findById(friendId)

                if(user.friends.includes(friendId)){
                    user.friends.filter((id:any) => id !== friendId)
                    friend.friends = friend.friends.filter((id:any) => id !==id)
                    res.json({message:`You have stopped following ${friend.username}`});
                    
                }else{
                    user.friends.push(friendId)
                    friend.friends.push(id)
                }
                await user.save()
                await friend.save()

                const friends:any = await Promise.all(
                    user.friends.map((id:any) => user.findById(id))
                )
                if(!friends.length){
                    return res.status(400).json({message:"You have no friends"})
                }

                const formattedFriends:[] = friends.map(
                    ({id, username, email}:any) =>{
                        return {id, username,email}
                    }
                )
                
                return res.status(200).json(formattedFriends)
            } catch (error) {
                console.log("no response");
                res.status(404).json({ message: "message 404 bad request" });
            }
        }
    };

    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No response for this request" });
};

export default handler;