CREATE TABLE "academic_work" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"institution" text,
	"field" text,
	"description" text,
	"status" text DEFAULT 'current' NOT NULL,
	"current" boolean DEFAULT true NOT NULL,
	"start_date" date,
	"end_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"key" text NOT NULL,
	"url" text NOT NULL,
	"mime_type" text NOT NULL,
	"size" integer NOT NULL,
	"bucket" text,
	"uploaded_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "files_key_unique" UNIQUE("key")
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "logo" text;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_uploaded_by_user_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "academic_work_current_idx" ON "academic_work" USING btree ("current");--> statement-breakpoint
CREATE INDEX "files_key_idx" ON "files" USING btree ("key");--> statement-breakpoint
CREATE INDEX "files_uploaded_by_idx" ON "files" USING btree ("uploaded_by");