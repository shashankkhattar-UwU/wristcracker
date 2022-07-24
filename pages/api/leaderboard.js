import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prismaInstance";

export default async (req= NextApiRequest, res= NextApiResponse)=> {
    if(req.method=='GET'){
        const scores= await prisma.score.findMany({include: {user: {select: {username: true}}}, orderBy: {time: "asc"}, take: 10})
        
        const finalScores=scores.map(score=>{
            return{
                time: score.time,
                accuracy: score.accuracy,
                playerName: score.user.username
            };
        })
        res.status(200).json({"scores":finalScores});
    }
    else{
        res.status(400).json({"error": "No request possible"});
    }
}