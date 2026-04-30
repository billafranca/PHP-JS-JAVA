<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

require_once __DIR__ . '/usuario.class.php';  
$usuario = new Usuario();
$connection = $usuario->conn();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
    if ($connection) {
        $email = $_POST['email'];
        $senha = $_POST['senha'];
        
        if ($usuario->checkUser($email)) {
            if ($usuario->checkPass($email, $senha)) {
                $_SESSION['email'] = $email;
                header("Location: view/index.php");
                exit();
            } else {
                echo "Usuario ou senha incorretos";
            }
        } else {
            header("Location: cadastro.php");
            exit();
        }
    } else {
        echo "Banco indisponivel.";
    }
}
?>
<link rel="stylesheet" href="css/login.css">
<section id="formCad">
    <h2>Acessar <em>Conta</em></h2>
    
    <form method="post" action="login.php">
        <p>
            <input id="email" type="email" name="email" placeholder="Seu e-mail cadastrado" required>
        </p>
        
        <p>
            <input id="senha" type="password" name="senha" placeholder="Sua senha" required>
        </p>
        
        <button id="btnCadastrar" type="submit">Entrar</button>
        
        <a href="cadastro.php">Não tem uma conta? Cadastre-se aqui</a>
    </form>
</section>