import prisma from "../../prisma/prismaInstance";
import {verify} from 'jsonwebtoken'

export default async function handler(req, res) {
    if(req.method=='POST'){
        const data=req.body
        const validate=verify(data.jwt, "secret");
        const user=await prisma.player.findUnique({where: {id: validate.id}});
        if(!user)
            res.status(404).json({"error": "Authentication failed"});
        const score=await prisma.score.create({data: {accuracy: parseFloat(data.accuracy), time: parseFloat(data.time), playerId: validate.id}});
        // console.log(score);
        res.status(200).json({"message": "all ok"});
    }
    else{
        res.status(400).json({"error": "No request possible"});
    }
}