
import { Hono } from "hono";
import {sign, verify} from "hono/jwt"
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog"; 
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string,
  };
  // to elimante the error in TS in hono of the c.env you can see the structure of hono or can find it by googling
}>();

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })


// app.use('/api/v1/blog/*', async (c, next) => {
//   // get the Headers
//   // verrify the Headers
//   // if the Headers is not correct,we need can proceed 
//   // if not we return the useer a 403 status code
//   const header=c.req.header("authorization") || "" ;

//   const token=header.split(" ")[1];

//   const response= await verify(token,c.env.JWT_SECRET)
//   if(response.id){
//     next()
//   }else{
//     c.status(403)
//     return c.json({error:"unautorized"})
//   }
  
// })

app.use("/*",cors());
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

// moving user router to a folder for better folder stuct 1.01.000
// app.post('/api/v1/signup', async (c) => {
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());

// 	const body = await c.req.json();
// 	try {

//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email: body.email,
//       },
//     });

//     if (existingUser) {
//       c.status(409); // Conflict status
//       return c.json({ error: "Email already in use" });
//     }
// 		const user = await prisma.user.create({
// 			data: {
// 				email: body.email,
// 				password: body.password
// 			}
// 		});
//     // if (!c.env.JWT_SECRET) {
//     //   throw new Error("JWT secret is not defined");
//     // }
// 		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
// 		return c.json({ jwt });
// 	} catch(e) {
    
// 		c.status(403);
// 		return c.json({ error: "error while signing up" });
// 	}
// })

// app.post("/api/v1/signin", async(c) => {
//   const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());

//   const body=await c.req.json();
//   const user =await prisma.user.findUnique({
//     where:{
//       email:body.email,
//       password:body.password
//     }
//   });
//   if (!user) {
// 		c.status(403);
// 		return c.json({ error: "user not found" });
// 	}

// 	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
// 	return c.json({ jwt });
//   // return c.text("signin route");
// });



// move all blog route to the blog.ts file 

// app.get("/api/v1/blog/:id", (c) => {
//   const id = c.req.param("id");
//   console.log(id);
//   return c.text("get blog route");
// });

// app.post("/api/v1/blog", (c) => {
//   return c.text("signin route");
// });
// // for posting

// app.put("/api/v1/blog", (c) => {
//   return c.text("signin route");
// });
// // for  updating

export default app;

// why cant we use docker for postgress ?
// reason is my connection pool url is not connect to thelocal data basee
   


// // if u are using a Node.js based edge environment, then the pooled conenction will work fine with neon.db
// pool url

// // if u are using a different js runtime (similar to AWS LAmbda / cloudflare workersa) is when the neon.tech
// pooled conn might not work

// //.The pooled .conn . that .u.get . from .nepn. db .does . not .have .a. bunch .of .prisma . dependencoes
// // that .the prisma .pooled .conn .does