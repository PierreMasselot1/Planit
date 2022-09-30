CREATE TABLE "todo_list"(
    "id" SERIAL PRIMARY KEY,
    "owner_id" integer NOT NULL
);
CREATE TABLE "todo" (
    "id" SERIAL PRIMARY KEY,
    "todo_list_id" integer NOT NULL,
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    CONSTRAINT "todo_fk1" FOREIGN KEY ("todo_list_id") REFERENCES "todo_list"("id")
);
INSERT INTO todo_list ("id", "owner_id")
VALUES (1, 1);
INSERT INTO todo ("todo_list_id", "title", "description")
VALUES (
        1,
        'THIS IS A DEVELOPMENT TEST TODO',
        'THIS IS THE DESCRIPTION OF THE TEST TODO'
    );