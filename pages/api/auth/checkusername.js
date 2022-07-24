
import prisma from "../../../prisma/prismaInstance";

export default async function handler(req, res) {
    if(req.method==="POST"){
        var username;
        try {
            username=req.body.username;
        } catch (error) {
            res.send(400).json({error: "bad request"});
        }
        const user = await prisma.player.findFirst({select: {username: true} , where: {username: username}});
        var isTaken=false;
        if (user) {
            isTaken=true;
        }
        res.status(200).json({ isTaken: isTaken });
    }
    else{
        res.status(400).json({ message: 'invalid request' });
    }
  }
  