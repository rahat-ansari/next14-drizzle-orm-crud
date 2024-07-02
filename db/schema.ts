/**
 * This module defines the database schema for the application, including tables for users, posts, categories, and their relationships.
 *
 * The `users` table stores user information such as name, email, password, and other profile details.
 * The `posts` table stores blog posts, with a reference to the author (user) and the categories the post belongs to.
 * The `categories` table stores the categories for the blog posts.
 * The `post_categories` table is a junction table that maps the many-to-many relationship between posts and categories.
 * The `profiles` table stores additional user profile information, linked to the `users` table.
 *
 * The schema is defined using the `drizzle-orm` library, which provides a type-safe way to interact with the database.
 */
import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
  address: varchar("address", { length: 256 }),
  score: integer("score"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
  //date: interval("date"),
});

/**
 * Defines the relations between the `users` table and other tables in the database schema.
 *
 * The `userRelations` object defines the following relations:
 * - `profile`: A one-to-one relation between a user and their profile information, using the `profiles` table.
 * - `posts`: A one-to-many relation between a user and the posts they have authored, using the `posts` table.
 */
export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  posts: many(posts),
}));

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 256 }),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),
});

/**
 * Defines a one-to-one relation between a post and its author, using the `users` table.
 * The `author` relation maps the `authorId` field on the `posts` table to the `id` field on the `users` table.
 */
export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),

  postCategories: many(postOnCategories),
}));

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  posts: many(postOnCategories),
}));

export const postOnCategories = pgTable(
  "post_categories",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey(t.postId, t.categoryId),
  })
);
export const postOnCategoriesRelations = relations(
  postOnCategories,
  ({ one }) => ({
    post: one(posts, {
      fields: [postOnCategories.postId],
      references: [posts.id],
    }),

    category: one(categories, {
      fields: [postOnCategories.categoryId],
      references: [categories.id],
    }),
  })
);

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  bio: varchar("bio", { length: 256 }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});
