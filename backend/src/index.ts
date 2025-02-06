import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {cors} from 'hono/cors'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_Secret:string
	}
}>();
app.use('/*',cors())
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)

app.delete("/api/v1/delete",(c)=>{
  return c.text("deleted")
})

export default app

