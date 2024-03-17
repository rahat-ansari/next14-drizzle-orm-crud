import { db } from "@/db";
import { users } from "@/db/schema";
import { and, eq, gt, like } from "drizzle-orm";

// user-service.ts
export class UserService {
  async getFilteredUsers() {
    // database query

    const role = "admin";

    const validRoles = ["admin", "customer"];

    if (!validRoles.includes(role)) {
      throw new Error("Invalid role");
    }

    try {
      const result = await db
        .select()
        .from(users)
        .where(
          and(
            eq(users.role, role),
            like(users.fullName, "%a%"),
            gt(users.score, 70)
          )
        );
      // logger.info("Users retrieved successfully");
      return new Response(JSON.stringify(result));
    } catch (error) {
      console.error(error);
      return new Response(`error`, { status: 500 });
    }
  }
}
