CREATE TABLE "todo_list"(
    "id" SERIAL PRIMARY KEY,
    "owner_id" VARCHAR(255) NOT NULL
);
CREATE TABLE "todo" (
    "id" SERIAL PRIMARY KEY,
    "todo_list_id" integer NOT NULL,
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "is_deleted" BOOLEAN,
    CONSTRAINT "todo_fk1" FOREIGN KEY ("todo_list_id") REFERENCES "todo_list"("id")
);
CREATE TABLE "habit_list"(
    "id" SERIAL PRIMARY KEY,
    "user_id" VARCHAR(255) NOT NULL,
);
CREATE TABLE "habit" (
    "id" SERIAL PRIMARY KEY,
    "habit_list_id" integer NOT NULL,
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "is_deleted" BOOLEAN,
    "streak" integer,
    "last_completed" DATE,
    CONSTRAINT "habit_fk1" FOREIGN KEY ("habit_list_id") REFERENCES "habit_list"("id")
);
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255)
);