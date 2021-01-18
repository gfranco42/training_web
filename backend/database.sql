CREATE DATABASE asylumheroes;

-- create extension if doesn't exist
create extension if not exists "uuid-ossp";

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    age VARCHAR(255) NOT NULL,
    pseudo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL 
);

-- insert fake user
INSERT INTO users (age, pseudo, email, status, password) VALUES ('1994-06-01', 'Great Jack', 'fake@mail.com', 'admin', 'qwerty');