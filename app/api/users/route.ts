import { db } from "@/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
//import Error from "next/error";

const role = "admin";

const validRoles = ["admin", "customer"];

if (!validRoles.includes(role)) {
  throw new Error("Invalid role");
}

// export async function GET(): Promise<Response> {
//   // try {
//   //   // database query
//   //   const result = await db.select().from(users).where(eq(users.role, "admin"));
//   //   const breakPoint1 = 1;
//   //   // return new Response(JSON.stringify(result));
//   //   return NextResponse.json(result);
//   // } catch (error) {
//   //   console.error(error);
//   //   return new Response(`error`, { status: 500 });
//   // }

//   const result = await db
//     .select()
//     .from(users)
//     .where(
//       and(
//         eq(users.role, "admin"),
//         //like(users.fullName, "%a%"),
//         gt(users.score, 70)
//       )
//     );

//   // const result = await db.query.users.findFirst({
//   //   with: {
//   //     profile: true,
//   //     posts: true,
//   //   },
//   // });

//   // const result = await db.query.posts.findFirst({
//   //   with: {
//   //     author: true,
//   //     postCategories: {
//   //       columns: {
//   //         categoryId: false,
//   //         postId: false,
//   //       },
//   //       with: {
//   //         category: {
//   //           columns: {
//   //             id: true,
//   //             name: true,
//   //           },
//   //         },
//   //       },
//   //     },
//   //   },
//   // });
//   // const result2 = await db.query.categories.findFirst({
//   //   with: { posts: true },
//   // });
//   return NextResponse.json(result);
// }

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get filtered users
 *     description: Retrieves a list of filtered users based on specific criteria
 *     responses:
 *      200:
 *        description: Successful response *
 *      400:
 *        description: Not found
 */

export async function GET(): Promise<Response> {
  // Do whatever you want
  const result = await db.select().from(users).where(
    and()
    //inArray(users.role, ["admin", "customer"])
    // like(users.fullName, "%a%"),
    //gt(users.score, 30)
  );

  return NextResponse.json(result);
}
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Fetch users according to role
 *     description: Retrieves users based on the provided role
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, customer]
 *         example: admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, customer]
 *                 example: admin
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();
  const { role } = body;

  if (!role) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const result = await db.select().from(users).where(eq(users.role, role));

  return NextResponse.json(result);
}
