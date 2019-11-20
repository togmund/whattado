DROP TABLE IF EXISTS todos CASCADE;
CREATE TABLE "todos" (
  "todo_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "author" VARCHAR(255),
  "subtype" VARCHAR(255),
  "year" VARCHAR(255),
  "location" VARCHAR(500),
  "api_id" VARCHAR(255),
  "genre" VARCHAR(255),
  "url" VARCHAR(500),
  "img" VARCHAR(500),
  "age_rating" VARCHAR(255),
  "user_rating" VARCHAR(255),
  "type_id" INTEGER NOT NULL,
);

ALTER TABLE "todos" ADD FOREIGN KEY ("type_id") REFERENCES "types" ("type_id");

