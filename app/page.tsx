import { db } from "@/db";
import { users } from "@/db/schema";
import {and, eq, gt, like} from "drizzle-orm";

/**
 * Renders a list of items fetched from a database.
 *
 * @returns The rendered HTML elements that display the fetched data in a list format.
 */

export default async function Home() {
 // const result = await db.select().from(users).where(eq(users.role, "admin"));
  const role = "admin";

  const validRoles = ["admin", "customer"];

  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }
  const result = await db
      .select()
      .from(users)
      .where(
          and(
              //eq(users.role, role),
             // like(users.fullName, "%a%"),
              gt(users.score, 30)
          )
      );
  const breakPoint = 1;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* <h2>hello</h2> */}
        {/* <ul>
          {result.map((item, index) => (
            <li key={item.id}>
              {index} {item.id} == {item.name}
            </li>
          ))}
        </ul> */}

        <table className="w-full border-separate border-spacing-2 border border-slate-400 text-left">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr
                key={item.id}
                className={`border pl-1 border-slate-300 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <p>{JSON.stringify(result)}</p> */}
      </div>
    </main>
  );
}
