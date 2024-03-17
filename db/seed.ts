import { faker } from "@faker-js/faker";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { categories, postOnCategories, posts, profiles, users } from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

// Generate a random interval between two dates

async function main() {
  console.log("seeding started!");
  // type Role = "admin" | "customer";
  const generateRandomInterval = () => {
    const startDate = faker.date.past();
    const endDate = faker.date.future();

    return {
      start: startDate,
      end: endDate,
    };
  };

  let userId = 0;
  for (let index = 0; index < 10; index++) {
    const user = await db
      .insert(users)
      .values({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        fullName: faker.person.fullName(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        score: faker.number.int({ min: 0, max: 100 }),
        role: faker.helpers.arrayElement(["admin", "customer"]),
        createdAt: faker.date.recent({ days: 10 }),
        updatedAt: faker.date.recent({ days: 10 }),
        // date: faker.date.between("createdAt", "updatedAt")
      })
      .returning();
    userId = user[0].id;

    const profile = await db.insert(profiles).values({
      userId,
      bio: faker.person.bio(),
    });
  }

  const cats = await db
    .insert(categories)
    .values([
      {
        name: "Sport",
      },
      { name: "Economics" },
    ])
    .returning();

  const insertedPosts = await db
    .insert(posts)
    .values([
      {
        authorId: userId,
        text: faker.lorem.sentence(),
      },
      {
        authorId: userId,
        text: faker.lorem.sentence(),
      },
    ])
    .returning();

  await db.insert(postOnCategories).values([
    {
      categoryId: cats[0].id,
      postId: insertedPosts[0].id,
    },
    {
      categoryId: cats[1].id,
      postId: insertedPosts[0].id,
    },
    {
      categoryId: cats[0].id,
      postId: insertedPosts[1].id,
    },
    {
      categoryId: cats[1].id,
      postId: insertedPosts[1].id,
    },
  ]);

  console.log("seeding finished!");

  console.log("migration ended...");
  process.exit(0);
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
