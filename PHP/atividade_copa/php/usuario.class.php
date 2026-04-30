<?php
class Usuario {
    private $id;
    private $nome;
    private $email;
    private $senha;
    private $pdo;

    function getId(){
        return $this->id;
    }

    function setId($id){
        $this->id = $id;
    }

    function getNome(){
        return $this->nome;
    }

    function setNome($nome){
        $this->nome = $nome;
    }

    function getEmail(){
        return $this->email;
    }

    function setEmail($email){
        $this->email = $email;
    }

    function getSenha(){
        return $this->senha;
    }

    function setSenha($senha){
        $this->senha = $senha;
    }

    public function checkUser($email){
        $sql = "SELECT * FROM usuario WHERE email = :e";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":e", $email);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }
    public function checkPass($email, $senha) {
    $sql = "SELECT senha FROM usuario WHERE email = :e";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(":e", $email);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        
        return password_verify($senha, $row['senha']);
    }
    return false;
}

    public function conn(){
        $dns = "mysql:dbname=bancoprojeto;host=localhost";
        $user = "root";
        $pass = "";

        try{
            $this->pdo = new PDO($dns, $user, $pass);
            return true;
        }catch(Throwable $th){
            return false;
        }
    }

    public function inserirUsuario($nome, $email, $senha){
        $sql = "INSERT INTO usuario (nome, email, senha) VALUES (:n, :e, :s)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":n", $nome);
        $stmt->bindValue(":e", $email);
        $stmt->bindValue(":s", password_hash($senha, PASSWORD_DEFAULT));
        return $stmt->execute();
    }
}
?>