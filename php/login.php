<?php
require_once 'config.php';
session_start(); // Inicia a sessão para manter o usuário logado

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email'] ?? '');
    $senha = $_POST['senha'] ?? '';

    if (!empty($email) && !empty($senha)) {

        // 1. Buscamos o usuário pelo e-mail

        $sql = $conexao->prepare("SELECT c_cliente, senha FROM cliente WHERE email = ?");
        $sql->bind_param("s", $email);
        $sql->execute();
        $resultado = $sql->get_result();

        // 2. Verificamos se o e-mail existe

        if ($resultado->num_rows === 1) {
            $usuario = $resultado->fetch_assoc();

            // 3. O PULO DO GATO: Verificamos se a senha digitada bate com o Hash

            if (password_verify($senha, $usuario['senha'])) {

                // Sucesso! Guardamos o ID na sessão

                $_SESSION['cliente_id'] = $usuario['c_cliente'];
                echo "Login realizado com sucesso! Bem-vindo.";

                // Redireciona para área logada

                // header("Location: dashboard.php");

            } else {
                echo "Senha incorreta.";
            }
        } else {
            echo "E-mail não encontrado.";
        }
        $sql->close();
    }
}
?>