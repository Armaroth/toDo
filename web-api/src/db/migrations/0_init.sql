CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "todo" (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id)
);
CREATE TABLE IF NOT EXISTS "archivedtodo" (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id)
);