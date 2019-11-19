DROP TABLE IF EXISTS types CASCADE;
CREATE TABLE "types" (
  "type_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "img" VARCHAR(500) NOT NULL,
  "color" VARCHAR(255) NOT NULL,
  "color_accent" VARCHAR(255) NOT NULL,
  "api_endpoint" VARCHAR(255)
);

DROP TABLE IF EXISTS todos CASCADE;
CREATE TABLE "todos" (
  "todo_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "type_id" INTEGER NOT NULL,
  "api_id" INTEGER,
  "api_sth" INTEGER
);

ALTER TABLE "todos" ADD FOREIGN KEY ("type_id") REFERENCES "types" ("type_id");

DROP TABLE IF EXISTS groups CASCADE;
CREATE TABLE "groups" (
  "group_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS times CASCADE;
CREATE TABLE "times" (
  "time_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "value" INTEGER NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "avatar" VARCHAR(500) NOT NULL,
  "group_id" INTEGER,
  "time_id" INTEGER
);

ALTER TABLE "users" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("group_id");

ALTER TABLE "users" ADD FOREIGN KEY ("time_id") REFERENCES "times" ("time_id");

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



INSERT INTO types (name, img, color, color_accent, api_endpoint) VALUES ('movies & shows', 'movie_filter', 'red', 'accent-4', 'something');

INSERT INTO types (name, img, color, color_accent, api_endpoint) VALUES ('books', 'menu_book', 'indigo', 'darken-2', 'different');

INSERT INTO types (name, img, color, color_accent, api_endpoint) VALUES ('shopping', 'shopping_basket', 'teal', 'darken-3', 'quelque chose de pareil');

INSERT INTO types (name, img, color, color_accent, api_endpoint) VALUES ('restaurants & cafes', 'restaurant', 'amber', 'darken-4', 'another thing');

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('Lucifer', 1, 540, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('Breaking Bad', 1, 390, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('Harry Potter', 1, 870, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('Lord of the Rings', 1, 287, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('Earls'' Kitchen', 2, 245, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('Cactus Club Cafe', 2, 435, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('Trees Organic Coffee', 2, 945, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('Thierry', 2, 946, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('bread', 3, 728, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('fruit', 3, 276, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('sofa', 3, 982, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('t-shirt', 3, 625, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('The Power', 4, 287, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('The Testaments', 4, 165, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('1984', 4, 324, 32);

INSERT INTO
  todos (name, type_id, api_id, api_sth)
VALUES
  ('World Without Fish', 4, 723, 32);

INSERT INTO
  groups (name)
VALUES
  ('Me Time');

INSERT INTO
  groups (name)
VALUES
  ('Couple Time');

INSERT INTO
  groups (name)
VALUES
  ('Friends Time');

INSERT INTO
  groups (name)
VALUES
  ('Family Time');

INSERT INTO
  times (name, value)
VALUES
  ('1 Hour', 60);

INSERT INTO
  times (name, value)
VALUES
  ('3 Hours', 180);

INSERT INTO
  times (name, value)
VALUES
  ('6 Hours', 360);

INSERT INTO
  times (name, value)
VALUES
  ('1 Day', 1440);

INSERT INTO
  users (name, email, password, avatar, group_id, time_id)
VALUES
  (
    'Diandra	Logsdale',
    'dlogsdale0@salon.com',
    'password',
    'face',
    1,
    2
  );

INSERT INTO
  users (name, email, password, avatar, group_id, time_id)
VALUES
  (
    'Flynn	Pierro',
    'fpierro1@fotki.com',
    'password',
    'face',
    2,
    1
  );

INSERT INTO
  users (name, email, password, avatar, group_id, time_id)
VALUES
  (
    'Jemie	Laughtisse',
    'jlaughtisse2@geocities.com',
    'password',
    'face',
    3,
    3
  );

INSERT INTO
  users (name, email, password, avatar, group_id, time_id)
VALUES
  (
    'Ciel	Linney',
    'clinney3@google.ca',
    'password',
    'face',
    4,
    4
  );

INSERT INTO
  user_todos (user_id, todo_id, done, done_count)
VALUES
  (1, 2, FALSE, 0);

INSERT INTO
  user_todos (user_id, todo_id, done, done_count)
VALUES
  (2, 4, FALSE, 0);

INSERT INTO
  user_todos (user_id, todo_id, done, done_count)
VALUES
  (3, 7, FALSE, 0);

INSERT INTO
  user_todos (user_id, todo_id, done, done_count)
VALUES
  (4, 12, FALSE, 0);
