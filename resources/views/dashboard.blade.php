<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    <link rel="stylesheet" href="{{ asset('css/tables.css') }}">
    <link rel="stylesheet" href="{{ asset('css/internModal.css') }}">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" />
    <script src="https://kit.fontawesome.com/11cc3dd4c7.js" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


    <title>dashboard</title>
</head>

<body>
    <header>
        <div class="info-header">
            <div class="logo">
                <h3>Gerenciamento Escolar</h3>
            </div>
        </div>
    </header>
    <section class="main">
        <div class="sidebar">
            <h3>HOME</h3>
            <a href="#escolas" class="escolas" class="selecionado"><i class="fa-solid fa-school"></i> Escolas</a>
            <a href="#turmas" class="turmas"><i class="fa-solid fa-users-viewfinder"></i> Turmas</a>
            <a href="#professores" class="professores"><i class="fa-solid fa-users"></i> Professores</a>
            <br />
            <hr />
            <a href="/" class="sair"><i class="fa-solid fa-right-from-bracket"></i>Sair</a>
        </div>
        
        <div class="content"></div>

    </section>

    <div class="modal-background" style="display: none;"></div>
    <div class="modal" id="editModal" style="display: none;">
        <div class="content-wrapper">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <form id="editForm" action="/escola/update" method="post">
                    @csrf
                    <label for="nome_escola">Nome da Escola:</label>
                    <input type="text" id="nome_escola" name="nome_escola">

                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco">

                    <label for="inep">INEP:</label>
                    <input type="text" id="inep" name="inep">

                    <label for="status">Status:</label>
                    <input type="text" id="status" name="status">

                    <input type="submit" value="Salvar">
                </form>
            </div>
        </div>

    </div>

    <div class="modal-background" style="display: none;"></div>
    <div class="modal" id="editTurmaModal" style="display: none;">
        <div class="content-wrapper">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <form id="editTurmaForm" action="/turma/edit/" method="POST">
                    @csrf
                    <label for="nome_turma">Nome da Turma:</label>
                    <input type="text" id="nome_turma" name="nome_turma">

                    <label for="turno">Turno:</label>
                    <input type="text" id="turno" name="turno">

                    <label for="status">Status:</label>
                    <input type="text" id="status" name="status">

                    <input type="submit" value="Salvar">
                </form>
            </div>
        </div>
    </div>

    <div class="modal-background" style="display: none;"></div>
    <div class="modal" id="editProfModal" style="display: none;">
        <div class="content-wrapper">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <form id="editProfForm" action="/professor/edit/" method="POST">
                    @csrf
                    <input type="hidden" id="professor_id" name="id">
                    <label for="nome_professor">Nome do Professor:</label>
                    <input type="text" id="nome" name="nome">

                    <input type="submit" value="Salvar">
                </form>
            </div>
        </div>
    </div>
    <div class="modal-background" style="display: none;"></div>
    <div class="modal" id="vincularProfModal" style="display: none;">
        <div class="content-wrapper">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <form id="vincularProfForm" action="/professor/vincular/" method="POST">
                    @csrf
                    <input type="hidden" id="professor_id" name="id">
                    <label for="turma_id">Turma:</label>
                    <select id="turma_id" name="turma_id">
                        <!-- As opções serão preenchidas dinamicamente pelo JavaScript -->
                    </select>
                    <input type="submit" id="Vincular" value="Vincular">
                </form>
            </div>
        </div>
    </div>



    <script src="{{ asset('js/dashboard.js') }}"></script>
    <script src="{{ asset('js/tables.js') }}"></script>
    <script src="{{ asset('js/edit.js') }}"></script>
</body>

</html>