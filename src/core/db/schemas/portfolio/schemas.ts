import { pgTable, text, timestamp, boolean, date, index } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content"), // Detailed description if needed
  url: text("url"),
  githubUrl: text("github_url"),
  image: text("image"),
  logo: text("logo"), // Project logo URL or R2 file key
  technologies: text("technologies").array(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const experience = pgTable("experience", {
  id: text("id").primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  description: text("description").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"), // Null means "Present"
  current: boolean("current").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const academicWork = pgTable(
  "academic_work",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(), // e.g., "Preparing for a Statistical & Economics Engineering Program at ENSEA"
    institution: text("institution"), // e.g., "ENSEA"
    field: text("field"), // e.g., "Quantitative Finance & Economics"
    description: text("description"), // Context or research focus
    status: text("status").default("current").notNull(), // "current" | "upcoming" | "completed"
    current: boolean("current").default(true).notNull(), // Active current academic occupation
    startDate: date("start_date"),
    endDate: date("end_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("academic_work_current_idx").on(table.current),
  ],
);
