CREATE TABLE "todo_list"(
    "id" SERIAL PRIMARY KEY,
    "owner_id" VARCHAR(255) NOT NULL
);
CREATE TABLE "todo" (
    "id" SERIAL PRIMARY KEY,
    "todo_list_id" integer NOT NULL,
    "title" text ,
    "description" text ,
    "completed" BOOLEAN,
    "is_deleted" BOOLEAN,
    CONSTRAINT "todo_fk1" FOREIGN KEY ("todo_list_id") REFERENCES "todo_list"("id")
);
CREATE TABLE "habit_list"(
    "id" SERIAL PRIMARY KEY,
    "owner_id" VARCHAR(255) NOT NULL
);
CREATE TABLE "habit" (
    "id" SERIAL PRIMARY KEY,
    "habit_list_id" integer NOT NULL,
    "title" text ,
    "description" text ,
    "is_deleted" BOOLEAN,
    "streak" integer,
    "completion_count" integer,
    "completion_dates" timestamp [],
    CONSTRAINT "habit_fk1" FOREIGN KEY ("habit_list_id") REFERENCES "habit_list"("id")
);

CREATE TABLE "dailies_list"(
    "id" SERIAL PRIMARY KEY,
    "owner_id" VARCHAR(255) NOT NULL
);

CREATE TABLE "dailies" (
    "id" SERIAL PRIMARY KEY,
    "dailies_list_id" integer NOT NULL,
    "title" text ,
    "description" text ,
    "is_deleted" BOOLEAN,
    "streak" integer,
    "completion_count" integer,
    "completion_dates" timestamp [],
    CONSTRAINT "dailies_fk1" FOREIGN KEY ("dailies_list_id") REFERENCES "dailies_list"("id")
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "user_name" VARCHAR(255)
    "email" VARCHAR(255),
    "password" text,
); 