<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
    <script src="https://kit.fontawesome.com/11cc3dd4c7.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <title>cadastro</title>
</head>

<body>
    <div class="container" id="container">
        <div class="form-container"  >
            <form  id="cadGeral" action="/cadastroGeral" method="POST">
                @csrf
                <input type="text" name="nomeEscola" placeholder="Nome da escola">
                <input type="text" name="inep" placeholder="Inep">
                <input type="text" name="endereco" placeholder="Endereço">
                <hr style=" height: 1px; width:340px; background:navy;" />
                <div class="turmas-container" >
                    <div id="turmas">
                        <input type="text" name="turmas[nome][]" placeholder="Nome da turma">
                        <input type="text" name="turmas[turno][]" placeholder="Turno">
                    </div>
                </div>
                <button type="button" id="adicionarTurmaGeral">Adicionar Turma</button>

                <button type="submit">Cadastrar</button>

            </form>
        </div>


        <div class="toggle-container">
            <div class="toggle-right" >
                <h1>Cadastro</h1>
                <p class="infoCad"><i class="fa-solid fa-circle-info"></i> No formulário ao lado, cadastre uma escola e suas turmas. Para cadastrar um professor, use o botão abaixo.</p>
                <button class="hidden" id="cadastroProfessor">Cadastrar Professor</button>
                <hr style=" height: 1px;  width:290px; background: white">
                <button class="hidden" id="acessarRegistros">Acessar Registros</button>
                <p class="infoCad2"><i class="fa-solid fa-circle-info"></i> Aperte em "Acessar Registros" para vincludar professores á turmas, e editar outros dados.</p>
            </div>
        </div>

    </div>

    <!-- Modais -->
    <link rel="stylesheet" href="{{ asset('css/modal.css') }}">

    <div id="modalBackground" class="modal-background">
        <!-- Modal para cadastrar o professor -->
        <div id="professorModal" class="modal">
            <h1>Cadastrar Professor </h1>
            <form  id="formProf" action="/cadastroProfessor" method="POST">
                @csrf
                <input type="text" name="nome" placeholder="Nome do Professor" />
                <div class="button-wrapper">
                    <button type="submit">Cadastrar Professor</button>
                </div>
            </form>
        </div>

    </div>
    </div>
    <script src="{{ asset('js/index.js') }}"></script>
    <script src="{{ asset('js/modal.js') }}"></script>
</body>

</html>