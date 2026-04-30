CREATE DATABASE bancoprojeto;
USE bancoprojeto;

CREATE TABLE usuario(
    id int primary key auto_increment,
    nome VARCHAR(255);
    email VARCHAR(255);
    senha VARCHAR(255);
);