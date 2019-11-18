DROP TABLE IF EXISTS todos CASCADE;
CREATE TABLE "todos" (
  "todo_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "type_id" INTEGER NOT NULL,
  "api_id" INTEGER,
  "api_sth" INTEGER
);

ALTER TABLE "todos" ADD FOREIGN KEY ("type_id") REFERENCES "types" ("type_id");

