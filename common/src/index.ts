// 1.45.07 npm publishing thing although we now us monorepo so i am not doing it 

// now goo to package .json

// start the name as username/medium common
// change the main as "dist/index.js"
// common terminal
// npm login  npm publish  
// tsc -b compile the code and notice along with index.js you have index.d.ts decleration file 
// .npm igonore src as now all the thing is in dist folder for publishing 
// and then import in the backend using npm install whatevere the name you started with
import z from 'zod';

export const signUpInput = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(5),
});


export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string(),
});


export type SignUpInput = z.infer<typeof signUpInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;