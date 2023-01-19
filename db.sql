CREATE DATABASE biblioteca;

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    brief_bio TEXT NOT NULL,
    birth DATE NOT NULL,
    active  BOOLEAN NOT NULL 
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL ,
    isbn VARCHAR(20) NOT NULL ,
    year DATE NOT NULL ,
    author_id SERIAL NOT NULL,
    active  BOOLEAN NOT NULL,

    CONSTRAINT fk_author
      FOREIGN KEY (author_id) 
	    REFERENCES authors(id)
);