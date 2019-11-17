DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "avatar" VARCHAR(500) NOT NULL,
  "group_id" INTEGER,
  "time_id" INTEGER,
  "family" BOOLEAN
);

ALTER TABLE "users" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("group_id");

ALTER TABLE "users" ADD FOREIGN KEY ("time_id") REFERENCES "times" ("time_id");

