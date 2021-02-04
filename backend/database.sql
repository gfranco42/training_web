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
    description VARCHAR(255)
);

CREATE TABLE articles(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    text_content TEXT,
    img_content TEXT[],
    video_content TEXT[],
);

INSERT INTO articles (title, image, description, text_content, img_content, video_content) VALUES ('test',
'https://asylum-heroes.s3.eu-west-3.amazonaws.com/test-img.png',
'test description', 'Content text test',
'{"https://asylum-heroes.s3.eu-west-3.amazonaws.com/bob.gif", "https://asylum-heroes.s3.eu-west-3.amazonaws.com/giphy.gif"}', '{"https://www.youtube.com/watch?v=iDZA-cps21o", "https://www.youtube.com/watch?v=w7ejDZ8SWv8"}');