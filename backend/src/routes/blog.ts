import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_Secret:string
    },
    Variables:{
        userId:string
    }
}>();

blogRouter.use('/*',async ( c , next ) => {
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
})

blogRouter.post("/", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
      const body = await c.req.json();

      try {
        const response = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                published : body.published,
                authorId : c.get("userId")
            }
        })
        console.log(response);
        
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
  
blogRouter.put("/", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
      const body = await c.req.json();

    try {
        const response = await prisma.post.update({
            where:{
                id:body.id
            },
            data : {
                title : body.title,
                content : body.content
            }
        })
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

blogRouter.get("/bulk",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    //const body = await c.req.json();

    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({blogs})
})
  
blogRouter.get("/:id", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const id = c.req.param("id");

    try {
        const blog = await prisma.post.findFirst({
            where:{ id },
            select:{
                title:true,
                content:true,
                id:true,
                author:{
                   select:{
                    name:true
                   }
                }
            }
        })
        console.log(blog);
        
        if (!blog) {
            c.status(404);
            return c.json({ message: "Post not found" });
        }

        return c.json({ blog });
      } catch (error) {
        c.status(500);
        return c.json({
            message:"Due to some technical issues cant post the block"
        })
      }
})

