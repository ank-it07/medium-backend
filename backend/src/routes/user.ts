import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import {sign, verify} from "hono/jwt"

import { signInInput,signUpInput } from "@100xciz7/medium-common";

export const userRouter =  new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET:string,
    };
    // to elimante the error in TS in hono of the c.env you can see the structure of hono or can find it by googling
  }>();




userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);
  console.log(success);
  if(!success) {
    c.status(411);
    return c.json({ message: 'Invalid input' })
  }
	try {

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      c.status(409); // Conflict status
      return c.json({ error: "Email already in use" });
    }
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
    // if (!c.env.JWT_SECRET) {
    //   throw new Error("JWT secret is not defined");
    // }
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
    
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

userRouter.post("/signin", async(c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

  const body=await c.req.json();

  const { success } = signInInput.safeParse(body);
  if (!success) {
    c.status(411)
    return c.json({ message: 'Invalid input' })
  }
  const user =await prisma.user.findUnique({
    where:{
      email:body.email,
      password:body.password
    }
  });
  if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
  // return c.text("signin route");
});