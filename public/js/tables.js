$(document).ready(function () {
    $(".escolas").click(function (e) {
        e.preventDefault();

        $.ajax({
            url: "/getEscolas",
            method: "GET",
            success: function (data) {
                $(".content").html(""); // Limpa o conteúdo atual
                var table = $("<table>").addClass("table").append(
                    $("<thead>").addClass("header-row").append(
                        $("<tr>").append(
                            "<th>Nome</th>",
                            "<th>Endereço</th>",
                            "<th>INEP</th>",
                            "<th>Status</th>",
                            "<th>Ações</th>"
                        )
                    ),
                    $("<tbody>")
                );
                data.forEach(function (escola) {
                    var row = $("<tr>").append(
                        "<td>" + escola.nome_escola + "</td>",
                        "<td>" + escola.endereco + "</td>",
                        "<td>" + escola.inep + "</td>",
                        "<td>" + escola.status + "</td>",
                        $("<td>").append(
                            "<button class='edit-button editSchool' data-id='" + escola.id + "' title='Editar Escola'><i class='fa-solid fa-pen'></i></button>",
                            "<button class='delete-button delete-school' data-id='" + escola.id + "' title='Excluir Escola'><i class='fa-solid fa-trash-can'></i></button>"
                        )
                    );
                    table.find("tbody").append(row);

                    // Adiciona evento de clique para os botões de exclusão
                    $(".delete-school").click(function() {
                        var escolaId = $(this).data('id');
                        if (confirm("Tem certeza que deseja excluir esta escola? Todas as turmas associadas também serão excluídas.")) {
                            $.ajax({
                                url: '/escola/delete/' + escolaId,
                                type: 'DELETE',
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                },
                                success: function(response) {
                                    // Remover a linha da tabela
                                    row.remove();
                                },
                                error: function(xhr, status, error) {
                                    console.log(xhr.responseText)
                                    console.error(error);
                                }
                            });
                        }
                    });
                });
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
                var table = $("<table>").addClass("table"); // Adiciona a classe "table" à tabela
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
                    var row = $("<tr>").addClass("row").append( // Adiciona a classe "row" à linha da tabela
                        "<td>" + turma.nome_turma + "</td>",
                        "<td>" + turma.turno + "</td>",
                        "<td>" + turma.status + "</td>",
                        "<td>" + turma.nome_escola + "</td>",
                        $("<td>").append(
                            "<button class='edit-button editTurma' data-id='" + turma.id + "' title='Editar Turma'><i class='fa-solid fa-pen'></i></button>",
                            "<button class='delete-button' title='Excluir Turma'><i class='fa-solid fa-trash-can'></i></button>",
                        )
                    );
                    tbody.append(row);
                });
                table.append(thead, tbody);
                $(".content").append(table);
            },
        });
    });

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
                        "<td>" + (professor.nome_turma ? professor.nome_turma : "Não está vinculado a nenhuma turma") + "</td>",
                        $("<td>").append(
                            "<button class='edit-button editProf' data-id='" + professor.id + "' title='Editar Professor'><i class='fa-solid fa-pen'></i></button>",
                            "<button class='delete-button' title='Excluir Professor'><i class='fa-solid fa-trash-can'></i></button>",
                        )
                    );
                    tbody.append(row);
                });
                table.append(thead, tbody);
                $(".content").append(table);
            },
        });
    });
