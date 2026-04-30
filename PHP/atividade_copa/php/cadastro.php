<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);



require_once __DIR__ . '/usuario.class.php';        
$usuarioObj = new Usuario();
$conn = $usuarioObj->conn();



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if ($conn) {
        if (isset($_POST['usuario'], $_POST['email'], $_POST['senha'])) {
            $nome = $_POST['usuario'];
            $email = $_POST['email'];
            $senha = $_POST['senha'];

            if ($usuarioObj->checkUser($email)) {
                echo "<script>alert('E-mail já cadastrado!');</script>";
            } else {
                if ($usuarioObj->inserirUsuario($nome, $email, $senha)) {
                    echo "Usuario cadastrado com sucesso! <a href='login.php'>Fazer Login</a>";
                } else {
                    echo "Erro ao cadastrar!";
                }
            }
        }
    } else {
        echo "Banco indisponível.";
    }
}
?>
<link rel="stylesheet" href="css/cadastro.css">
<h2>Criar conta</h2>
<form  id="formCad" method="post" action="cadastro.php">
    <input id="usuario" type="text" name="usuario" placeholder="Nome de usuário" required><p>
    <input id="email" type="email" name="email" placeholder="Seu e-mail" required><p>
    <input id="senha" type="password" name="senha" placeholder="Crie uma senha (forte)" required><p>
    <button id="btnCadastrar" type="submit" value="Cadastrar">Criar</button>
    <a href="login.php">Já tem conta? Logar</a>
</form>