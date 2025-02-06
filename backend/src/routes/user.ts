import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import {singupInput,signinInput} from "@yogeshwar9/medium_common"

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_Secret:string
    }
}>();

userRouter.post('/signup',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    
    const {success} = singupInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message:"Enter valid Inputs"
      })
    }
    try {
      const user = await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
          name:body.name
        }
      })
      console.log(user);
      
      const token =await sign({id:user.id},c.env.JWT_Secret,)
      console.log(token);
      c.status(200)
      return c.json({token});
    } catch (error) {
      c.status(411);
      return c.text("user already exist")
    }
  })
  
  userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message:"Enter valid Inputs"
      })
    }
    const userFound = await prisma.user.findFirst({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!userFound){
      c.status(403)
      return c.text("user not found")
    }
    else{
      const token = await sign({id:userFound.id},c.env.JWT_Secret,)
  
      c.status(200)
      return c.json(token);
    }
  })
  