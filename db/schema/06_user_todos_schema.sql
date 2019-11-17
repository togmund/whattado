DROP TABLE IF EXISTS user_todos CASCADE;
CREATE TABLE "user_todos" (
  "user_todo_id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" INTEGER,
  "todo_id" INTEGER,
  "done" BOOLEAN NOT NULL,
  "rating" INTEGER,
  "done_count" SERIAL NOT NULL
);

ALTER TABLE "user_todos" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "user_todos" ADD FOREIGN KEY ("todo_id") REFERENCES "todos" ("todo_id");
