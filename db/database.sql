CREATE TABLE "todo_list"(
    "id" SERIAL PRIMARY KEY
);
CREATE TABLE "todo" (
    "id" SERIAL PRIMARY KEY,
    "todo_list_id" integer NOT NULL,
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "is_deleted" BOOLEAN,
    CONSTRAINT "todo_fk1" FOREIGN KEY ("todo_list_id") REFERENCES "todo_list"("id")
);
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255)
);