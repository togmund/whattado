DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS types CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS times CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS user_todos CASCADE;


CREATE TABLE "todos" (
  "todo_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "type_id" INTEGER NOT NULL,
  "api_id" INTEGER,
  "api_..." INTEGER
);

CREATE TABLE "types" (
  "type_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "img" VARCHAR(500) NOT NULL,
  "color" VARCHAR(255) NOT NULL,
  "api_endpoint" VARCHAR(255)
);

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

CREATE TABLE "times" (
  "time_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "value" INTEGER NOT NULL
);

CREATE TABLE "groups" (
  "group_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "user_todos" (
  "user_todo_id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" INTEGER,
  "todo_id" INTEGER,
  "done" BOOLEAN NOT NULL,
  "rating" INTEGER,
  "done_count" SERIAL NOT NULL
);

ALTER TABLE "types" ADD FOREIGN KEY ("type_id") REFERENCES "todos" ("type_id");

ALTER TABLE "groups" ADD FOREIGN KEY ("group_id") REFERENCES "users" ("group_id");

ALTER TABLE "times" ADD FOREIGN KEY ("time_id") REFERENCES "users" ("time_id");

ALTER TABLE "users" ADD FOREIGN KEY ("user_id") REFERENCES "user_todos" ("user_id");

ALTER TABLE "todos" ADD FOREIGN KEY ("todo_id") REFERENCES "user_todos" ("todo_id");
