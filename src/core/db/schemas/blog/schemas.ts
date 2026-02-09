import { pgTable, text, timestamp, boolean, index, integer } from "drizzle-orm/pg-core";
import { user } from "../auth/schemas";

export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  published: boolean("published").default(false).notNull(),
  authorId: text("author_id").references(() => user.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  views: integer("views").default(0).notNull(),
  coverImage: text("cover_image"),
  tags: text("tags").array(),
}, (table) => [
  index("posts_slug_idx").on(table.slug),
  index("posts_published_idx").on(table.published),
]);
