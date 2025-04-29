CREATE DATABASE heros;

\c heros

CREATE TABLE publisher(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    founder VARCHAR(50)
);

CREATE TABLE hero(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL, 
    id_publisher INTEGER REFERENCES publisher(id) ON DELETE SET NULL
);

INSERT INTO publisher (name, founder) VALUES
('Marvel', 'Martin Goodman'),
('DC', 'Malcolm Wheeler-Nicholson');

INSERT INTO hero (name, id_publisher) VALUES 
('Homem-Aranha', 1),
('Capitão America', 1),
('Batman', 2),
('Doutor Estranho', 1),
('Superman', 2);

ALTER TABLE hero ADD COLUMN photo TEXT;