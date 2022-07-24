import prisma from "../../../prisma/prismaInstance";
import { hash, getSalt, genSalt } from "bcryptjs";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
    if(req.method==="POST"){
        const data=req.body
        try {
            const prev=await prisma.player.findUnique({where: {username: data.username}, select: {username: true}});
            if(prev){
                return res.status(409).json({error: "username is taken"});
            }
            const salt=await genSalt(10);
            const password_hash= await hash(data.password, salt);
            const player= await prisma.player.create({data: {
                username: data.username,
                password: password_hash
            }})
            const token=sign({id: player.id}, "secret");
            res.status(200).json({ player: { username: player.username, jwt: token } });
        } catch (error) {
            res.status(400).json({error: "Your request was incorrect"});
        }
    }
    else
    res.status(400).json({"error": "No request possible"});
}
  