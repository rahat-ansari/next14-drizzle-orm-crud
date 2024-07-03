import { db } from "@/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
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
 * /api/user:
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
  const result = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.role, role)
        // like(users.fullName, "%a%"),
        //gt(users.score, 30)
      )
    );

  return NextResponse.json(result);
}
