<?php

session_start();

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$cpf = $_POST['cpf'] ?? '';

if (empty($name)) {
    echo "nome inválido";
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "login";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(255)
)";

$conn->query($sql);

$stmt = $conn->prepare("INSERT INTO users (nome, email, senha, cpf) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $senha, $cpf);
$stmt->execute();

$stmt->close();
$conn->close();
