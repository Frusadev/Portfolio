import { pgTable, text, timestamp, integer, index } from "drizzle-orm/pg-core";
import { user } from "../auth/schemas";
import { relations } from "drizzle-orm";

export const files = pgTable(
  "files",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(), // Original file name (e.g. "logo.svg")
    key: text("key").notNull().unique(), // Cloudflare R2 object key (e.g. "logos/project-id.svg")
    url: text("url").notNull(), // Public URL or CDN endpoint
    mimeType: text("mime_type").notNull(), // MIME type (e.g. "image/svg+xml", "image/png")
    size: integer("size").notNull(), // File size in bytes
    bucket: text("bucket"), // Optional R2 bucket identifier
    uploadedBy: text("uploaded_by").references(() => user.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("files_key_idx").on(table.key),
    index("files_uploaded_by_idx").on(table.uploadedBy),
  ],
);

export const filesRelations = relations(files, ({ one }) => ({
  uploader: one(user, {
    fields: [files.uploadedBy],
    references: [user.id],
  }),
}));
