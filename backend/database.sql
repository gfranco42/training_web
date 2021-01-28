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

CREATE TABLE images(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    url VARCHAR(255) NOT NULL
);

CREATE TABLE ytvideos(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    ep_nb INTEGER NOT NULL,
    description VARCHAR(255),
);