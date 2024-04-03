$(document).on("click", ".editSchool", function () {
    var escolaId = $(this).data("id");

    // Buscar os dados da escola
    $.get("/escola/edit/" + escolaId, function (escola) {
        // Preencher o formulário com os dados da escola
        $('#editForm input[name="nome_escola"]').val(escola.nome_escola);
        $('#editForm input[name="endereco"]').val(escola.endereco);
        $('#editForm input[name="inep"]').val(escola.inep);
        $('#editForm input[name="status"]').val(escola.status);

        $("#editForm").attr("action", "/escola/update/" + escolaId);
        // Mostrar a modal
        $("#editModal").show();
        $(".modal-background").show();
    });
});

//clica(x), fecha a modal
$(".close-button").click(function () {
    $("#editModal").hide();
    $(".modal-background").hide();
});

$("#saveButton").click(function () {
    var escolaId = $(".editSchool").data("id");

    // Envia os dados do formulário para o servidor
    $.post(
        "/escola/update/" + escolaId,
        $("#editForm").serialize(),
        function () {
            // Fecha a modal e recarrega a tabela
            $("#editModal").hide();
        }
    );
});

$(document).on("click", ".delete-school", function () {
    var escolaId = $(this).data("id");
    if (confirm("Tem certeza que deseja excluir esta escola?")) {
        $.ajax({
            url: "/deleteEscola/" + escolaId,
            type: "DELETE",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                alert("Escola excluída com sucesso! Atualize a pagina!");

                $.get("/getEscolas", function (data) {
                    
                    $(".content").html(data);
                });
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                console.error(error);
                alert("Ocorreu um erro ao excluir a escola.");
            },
        });
    }
});



function getTurmas() {
    $.ajax({
        url: "/getTurmas",
        method: "GET",
        success: function (data) {
            $(".content").html(""); // Limpa o conteúdo atual
            var table = $("<table>").addClass("table"); // Adiciona a classe "table" à tabela
            var thead = $("<thead>")
                .addClass("header-row")
                .append(
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
                var row = $("<tr>")
                    .addClass("row")
                    .append(
                        // Adiciona a classe "row" à linha da tabela
                        "<td>" + turma.nome_turma + "</td>",
                        "<td>" + turma.turno + "</td>",
                        "<td>" + turma.status + "</td>",
                        "<td>" + turma.nome_escola + "</td>",
                        $("<td>").append(
                            "<button class='edit-button editTurma' data-id='" +
                                turma.id +
                                "' title='Editar Turma'><i class='fa-solid fa-pen'></i></button>",
                            "<button class='delete-button' title='Excluir Turma'><i class='fa-solid fa-trash-can'></i></button>",
                            "<button class='extra-button' title='Vincular Professor à Turma'><i class='fa-solid fa-person-circle-plus'></i></button>"
                        )
                    );
                tbody.append(row);
            });
            table.append(thead, tbody);
            $(".content").append(table);
        },
    });
}

$(document).on("click", ".editTurma", function () {
    var turmaId = $(this).data("id");
    console.log(turmaId);

    $.get("/turma/edit/" + turmaId, function (turma) {
        $('#editTurmaForm input[name="nome_turma"]').val(turma.nome_turma);
        $('#editTurmaForm input[name="turno"]').val(turma.turno);
        $('#editTurmaForm input[name="status"]').val(turma.status);

        $("#editTurmaForm").attr("action", "/turma/update/" + turmaId);

        $("#editTurmaModal").show();
        $(".modal-background").show();
    });
});

// Quando o usuário (x), fecha a modal
$(".close-button").click(function () {
    $("#editTurmaModal").hide();
    $(".modal-background").hide();
});

$("#editTurmaForm").on("submit", function (event) {
    event.preventDefault();

    var turmaId = $(".editTurma").data("id");

    // Enviar os dados do formulário para o servidor
    $.ajax({
        url: "/turma/update/" + turmaId,
        type: "POST",
        data: $(this).serialize(),
        success: function (response) {
            // Fechar a modal
            $("#editTurmaModal").hide();
            $(".modal-background").hide();

            alert(response.message);
            getTurmas();
        },
    });
});

$(document).on("click", ".edit-button.editProf", function () {
    var professorId = $(this).data("id");
    console.log(professorId);

    $.get("/professor/edit/" + professorId, function (professor) {
        $('#editProfForm input[name="nome_professor"]').val(professor.nome);
        $('#editProfForm input[name="id"]').val(professor.id);

        // Buscar todas as turmas disponíveis
        $.get("/getTurmas", function (turmas) {
            var select = $('#editProfForm select[name="turma_id"]');
            select.empty(); // Limpar todas as opções existentes

            // Adicionar uma opção para cada turma
            turmas.forEach(function (turma) {
                var option = $("<option>").val(turma.id).text(turma.nome_turma);
                select.append(option);
            });

            // Selecionar a turma atual do professor
            select.val(professor.turma_id);
        });

        $("#editProfForm").attr("action", "/professor/update/" + professorId);

        $("#editProfModal").show();
        $(".modal-background").show();
    });
});

// Quando o usuário (x), fecha a modal
$(".close-button").click(function () {
    $("#editProfModal").hide();
    $(".modal-background").hide();
});

$("#editProfForm").on("submit", function (event) {
    event.preventDefault();

    var professorId = $('#editProfForm input[name="id"]').val();

    // Enviar os dados do formulário para o servidor
    $.ajax({
        url: "/professor/update/" + professorId,
        type: "POST",
        data: $(this).serialize(),
        success: function (response) {
            // Fechar a modal
            $("#editProfModal").hide();
            $(".modal-background").hide();

            alert(response.message);
            getProfessores(); // Atualize a lista de professores
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
            alert(
                "Ocorreu um erro ao atualizar o professor. Por favor, tente novamente."
            );
        },
    });
});
