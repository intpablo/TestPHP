$(document).ready(function () {
    $(".escolas").click(function (e) {
        e.preventDefault();

        $.ajax({
            url: "/getEscolas",
            method: "GET",
            success: function (data) {
                $(".content").html("");
                var table = $("<table>").addClass("table");
                var thead = $("<thead>").addClass("header-row").append(
                    $("<tr>").append(
                        "<th>Nome</th>",
                        "<th>Endereço</th>",
                        "<th>INEP</th>",
                        "<th>Status</th>",
                        "<th>Ações</th>"
                    )
                );
                var tbody = $("<tbody>");
                data.forEach(function (escola) {
                    var row = $("<tr>").addClass("row").append(
                        "<td>" + escola.nome_escola + "</td>",
                        "<td>" + escola.endereco + "</td>",
                        "<td>" + escola.inep + "</td>",
                        "<td>" + escola.status + "</td>",
                        $("<td>").append(
                            "<button class='edit-button editSchool' data-id='" + escola.id + "' title='Editar Escola'><i class='fa-solid fa-pen'></i></button>",
                            "<button class='delete-button delete-school' data-id='" + escola.id + "' title='Excluir Escola'><i class='fa-solid fa-trash-can'></i></button>"
                        )
                    );
                    tbody.append(row);
                });
                table.append(thead, tbody);
                $(".content").append(table);
            },
        });
    });
});


$(".turmas").click(function (e) {
    e.preventDefault();

    $.ajax({
        url: "/getTurmas",
        method: "GET",
        success: function (data) {
            $(".content").html(""); // Limpa o conteúdo atual
            var table = $("<table>").addClass("table");
            var thead = $("<thead>").addClass("header-row").append(
                $("<tr>").append(
                    "<th>Nome da Turma</th>",
                    "<th>Turno</th>",
                    "<th>Status</th>",
                    "<th>Nome da Escola</th>",
                    "<th>Ações</th>"
                )
            );
            var tbody = $("<tbody>");
            data.forEach(function (turma) {
                var nomeEscola = turma.nome_escola || "Não definido"; // Se nome_escola for null, define como "Não definido"
                var row = $("<tr>").addClass("row").append(
                    "<td>" + turma.nome_turma + "</td>",
                    "<td>" + turma.turno + "</td>",
                    "<td>" + turma.status + "</td>",
                    "<td>" + nomeEscola + "</td>",
                    $("<td>").append(
                        "<button class='edit-button editTurma' data-id='" + turma.id + "' title='Editar Turma'><i class='fa-solid fa-pen'></i></button>",
                        "<button class='delete-button delete-turmas' data-id='" + turma.id + "' title='Excluir Turma'><i class='fa-solid fa-trash-can'></i></button>"
                    )
                );
                tbody.append(row);
            });
            table.append(thead, tbody);
            $(".content").append(table);
        },
    });
});


    $(document).ready(function() {
        $(".professores").click(function (e) {
            e.preventDefault();
        
            $.ajax({
                url: "/getProfessores",
                method: "GET",
                success: function (data) {
                    $(".content").html(""); // Limpa o conteúdo atual
                    var table = $("<table>").addClass("table"); 
                    var thead = $("<thead>").addClass("header-row").append(
                        $("<tr>").append(
                            "<th>Nome do Professor</th>",
                            "<th>Nome da Turma</th>",
                            "<th>Ações</th>"
                        )
                    );
                    var tbody = $("<tbody>");
                    data.forEach(function (professor) {
                        var row = $("<tr>").addClass("row").append( // Adiciona a classe "row" à linha da tabela
                            "<td>" + professor.nome + "</td>",
                            "<td>" + (professor.turmas.length > 0 ? professor.turmas.map(turma => turma.nome_turma || "Sem Nome").join(", ") : "Não está vinculado a nenhuma turma") + "</td>",
                            $("<td>").append(
                                "<button class='edit-button editProf' data-id='" + professor.id + "' title='Editar Professor'><i class='fa-solid fa-pen'></i></button>",
                                "<button class='vincularProf' data-id='" + professor.id + "' title='Vincular a Turma'><i class='fa-solid fa-users-viewfinder'></i></button>",
                                "<button class='delete-button deleteProf' data-id='" + professor.id + "' title='Excluir Professor'><i class='fa-solid fa-trash-can'></i></button>"
                            )
                        );
                        tbody.append(row);
                    });
                    table.append(thead, tbody);
                    $(".content").append(table);
                },
            });
        });
    
        
    });
