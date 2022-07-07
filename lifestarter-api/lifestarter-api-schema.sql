CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    password        TEXT NOT NULL,
    firstName      TEXT NOT NULL,
    lastName       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    username       TEXT NOT NULL UNIQUE
);

CREATE TABLE sleep(
    id              SERIAL PRIMARY KEY,
    createdAt       TIMESTAMP NOT NULL DEFAULT NOW(),
    startTime       TIMESTAMP NOT NULL,
    endTime         TIMESTAMP NOT NULL,
    user_id         INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

);

CREATE TABLE nutrition(
    id              SERIAL PRIMARY KEY,
    nutrient TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    calories INTEGER NOT NULL,
    imageUrl TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

);

CREATE TABLE exercise(
    id          SERIAL PRIMARY KEY,
    exercise TEXT NOT NULL,
    category TEXT NOT NULL,
    duration INTEGER NOT NULL,
    intensity INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

);