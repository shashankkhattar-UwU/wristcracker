import prisma from "../../../prisma/prismaInstance";
import { sign } from "jsonwebtoken";
import {compare} from 'bcryptjs'


export default async function handler(req, res) {
  if(req.method==="POST"){
    const data=req.body;
    try {
      const user= await prisma.player.findUnique({where: {username: data.username}, select: {username: true, password: true, id: true}});
      if(!user)
        return res.status(404).json({error: "Username does not exist"});
      const validation=await compare(data.password, user.password);
      if(validation){
        const token=sign({id: user.id}, "secret");
        // console.log(token);
        return res.status(200).json({player: {username: user.username, jwt: token}});
      }
      else
      return res.status(400).json({error: 'incorrect password'});
    } catch (error) {
      return res.status(400).json({error: 'There was an error in the request'});
    }
  }
  else{
    return res.status(400).json({error: "No request possible"});
  }
}
  