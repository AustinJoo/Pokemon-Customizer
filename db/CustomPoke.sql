DROP DATABASE IF EXISTS customPokemon;

CREATE DATABASE customPokemon;

\c custompokemon;

DROP TABLE IF EXISTS customizedPokemon;
DROP TABLE IF EXISTS movePool;
DROP TABLE IF EXISTS pokemonPool;

CREATE TABLE customizedPokemon(
    id SERIAL PRIMARY KEY,
    creator TEXT NOT NULL,
    pokeName TEXT NOT NULL,
    pokemonImage TEXT,
    pokemonType1 TEXT NOT NULL,
    pokemonType2 TEXT,
    move1 JSON NOT NULL,
    move2 JSON,
    move3 JSON, 
    move4 JSON
);

CREATE TABLE movePool(
    id INT PRIMARY KEY,
    moveName TEXT NOT NULL,
    moveType TEXT NOT NULL,
    damageClass TEXT NOT NULL
);

CREATE TABLE pokemonPool(
    id INT PRIMARY KEY,
    pokemonName TEXT NOT NULL,
    pokemonType1 TEXT NOT NULL,
    pokemonType2 TEXT,
    sprite TEXT,
    shinySprite TEXT
);