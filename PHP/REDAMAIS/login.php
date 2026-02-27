<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Login - REDA+</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <nav class="navbar">

        <div class="nav-logo">
            <img src="images/redapng.png" alt="Logo REDA+">
        </div>

        <ul class="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">contato</a></li>
            <li><a href="#">sobre</a></li>
        </ul>

    </nav>
    <div class="page">


        <div class="left">

            <div class="left-content">
                
                <h1>REDA+</h1>
                <h2>Domine a escrita.<br>Torne-se um <font color="#edb51a">MESTRE!</font>
                </h2>

                <p>
                    Compartilhe redações, receba correções detalhadas e evolua
                    de forma estratégica com nossa comunidade.
                </p>
            </div>

        </div>


       
        <div class="right">

            <div class="container">


                <div class="btn-group">
                    <button type="button" onclick="location.href='login.php'">Login</button>
                    <button type="button" onclick="location.href='cadastro.php'">Cadastro</button>
                </div>

                <form action="principal.php" method="POST">

                    <label>Usuário</label>
                    <input type="text" name="nome" required>

                    <label>Email</label>
                    <input type="email" name="email" required>

                    <label>Senha</label>

                    <div class="password-box">
                        <input type="password" name="senha" id="senha" required>

                        <button type="button" class="toggle-password" onclick="togglePassword()">
                            👁️
                        </button>
                    </div>

                    <script>
                        function togglePassword() {
                            const input = document.getElementById('senha');
                            input.type = input.type === 'password' ? 'text' : 'password';
                        }
                    </script>

                    <button type="submit">Entrar</button>

                </form>

            </div>

        </div>

    </div>


    <div class="SegundaParte">
        <div class="left-content-2">
            <h2>Por que escolher o REDA+ ?</h2>
            <p>
                O REDA+ é a plataforma ideal para quem deseja aprimorar suas habilidades de escrita. Com uma comunidade ativa, você pode compartilhar suas redações, receber feedback detalhado e aprender com os outros. Nossa abordagem estratégica ajuda você a evoluir de forma consistente, tornando-se um mestre na arte da redação.
            </p>
        </div>
         <div class="right-content-2">
        <img src="images/estudando.png" alt="Logo REDA+">
    </div>

</body>

</html>