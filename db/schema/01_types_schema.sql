DROP TABLE IF EXISTS types CASCADE;
CREATE TABLE "types" (
  "type_id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "img" VARCHAR(500) NOT NULL,
  "color" VARCHAR(255) NOT NULL,
  "color_accent" VARCHAR(255) NOT NULL,
  "api_endpoint" VARCHAR(255)
);
