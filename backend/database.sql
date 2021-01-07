CREATE DATABASE asylumheroes;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    pseudo VARCHAR(255),
    email VARCHAR(255),
    status VARCHAR(255)
);