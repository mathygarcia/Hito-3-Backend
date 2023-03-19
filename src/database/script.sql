CREATE DATABASE marketplace;

\ c marketplace;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad VARCHAR(3) NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contacto VARCHAR(30) NOT NULL,
    contraseña VARCHAR(500) NOT NULL,
    descripcion VARCHAR(1000) NOT NULL,
    links VARCHAR(500) NOT NULL,
    imagen VARCHAR(1000) NOT NULL
);

CREATE TABLE trabajos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(2000) NOT NULL,
    contacto VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    usuarios_id INT REFERENCES usuarios(id)
);

CREATE TABLE solicitudTrabajos (
    usuarios_id INT REFERENCES usuarios(id),
    trabajos_id INT REFERENCES trabajos(id)
);

SELECT
    *
FROM
    usuarios;

SELECT
    *
FROM
    trabajos;

SELECT
    *
FROM
    solicitudTrabajos;