import { MigrateUpArgs, MigrateDownArgs, sql } from 'payload'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings_resumes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  CREATE INDEX "site_settings_resumes_order_idx" ON "site_settings_resumes" USING btree ("_order");
  CREATE INDEX "site_settings_resumes_parent_id_idx" ON "site_settings_resumes" USING btree ("_parent_id");
  CREATE INDEX "site_settings_resumes_file_idx" ON "site_settings_resumes" USING btree ("file_id");
  ALTER TABLE "site_settings_resumes" ADD CONSTRAINT "site_settings_resumes_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_resumes" ADD CONSTRAINT "site_settings_resumes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_resumes" DROP CONSTRAINT "site_settings_resumes_file_id_media_id_fk";
  ALTER TABLE "site_settings_resumes" DROP CONSTRAINT "site_settings_resumes_parent_id_fk";
  DROP TABLE "site_settings_resumes";`)
}
