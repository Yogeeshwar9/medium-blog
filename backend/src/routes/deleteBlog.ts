import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'

export const deleteBlogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_Secret:string
    },
    Variables:{
        userId:string
    }
}>();

deleteBlogRouter.use('/*',async ( c , next ) => {
    const authHeader = c.req.header("Authorization") || "";

    const user = await verify(authHeader,c.env.JWT_Secret) as { id: string };

    if(user){
        c.set('userId',user.id)
        await next();
    }
    else{
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
});

deleteBlogRouter.delete("/", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
      const body = await c.req.json();

      try {
        const response = await prisma.post.delete({
            where : {
                id : body.id
            }
        })
        //console.log(response);
        
        return c.json({
            id:response.id
        })
      } catch (error) {
        c.status(500);
        return c.json({
            message:"Due to some technical issues cant post the block"
        })
    }
})
