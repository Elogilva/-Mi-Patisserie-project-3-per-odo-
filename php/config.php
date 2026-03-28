<?php

//Conexão com o banco de dados

$servidor = "localhost";
$nome = "root";
$senha = "";
$banco = "mi_patisserie_test";

//Criando a conexão

$conexao = mysqli_connect($servidor, $nome, $senha, $banco);

//Verificando a conexão

if ($conexao->connect_error) {
    die("Conexão falhou: " . $conexao->connect_error);
}

// echo "Conexão bem-sucedida!";

?>