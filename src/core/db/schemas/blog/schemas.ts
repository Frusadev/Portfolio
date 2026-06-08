import { pgTable, text, timestamp, boolean, index, integer, primaryKey } from "drizzle-orm/pg-core";
import { user } from "../auth/schemas";
import { relations } from "drizzle-orm";

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

export const comments = pgTable("comments", {
  id: text("id").primaryKey(),
  postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }).notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
}, (table) => [
  index("comments_post_id_idx").on(table.postId),
  index("comments_user_id_idx").on(table.userId),
]);

export const reactions = pgTable("reactions", {
  id: text("id").primaryKey(),
  postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }).notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  type: text("type").notNull(), // e.g., "thumb_up", "favorite", "celebration"
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("reactions_post_id_idx").on(table.postId),
  index("reactions_user_id_idx").on(table.userId),
  // Optional: A user can only react once per type per post
  // unique("reactions_unique_idx").on(table.postId, table.userId, table.type)
]);

export const series = pgTable("series", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const seriesPosts = pgTable("series_posts", {
  seriesId: text("series_id").references(() => series.id, { onDelete: "cascade" }).notNull(),
  postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }).notNull(),
  position: integer("position").notNull(),
}, (table) => [
  primaryKey({ columns: [table.seriesId, table.postId] }),
]);

export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
  reactions: many(reactions),
  series: many(seriesPosts),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  user: one(user, {
    fields: [comments.userId],
    references: [user.id],
  }),
}));

export const reactionsRelations = relations(reactions, ({ one }) => ({
  post: one(posts, {
    fields: [reactions.postId],
    references: [posts.id],
  }),
  user: one(user, {
    fields: [reactions.userId],
    references: [user.id],
  }),
}));

export const seriesRelations = relations(series, ({ many }) => ({
  posts: many(seriesPosts),
}));

export const seriesPostsRelations = relations(seriesPosts, ({ one }) => ({
  series: one(series, {
    fields: [seriesPosts.seriesId],
    references: [series.id],
  }),
  post: one(posts, {
    fields: [seriesPosts.postId],
    references: [posts.id],
  }),
}));

