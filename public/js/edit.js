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
    if (
        confirm(
            "Tem certeza que deseja excluir esta escola? Todas as turmas associadas a ela também serão excluidas"
        )
    ) {
        $.ajax({
            url: "/deleteEscola/" + escolaId,
            type: "DELETE",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                alert("Escola excluída com sucesso!");
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                console.error(error);
                alert("Ocorreu um erro ao excluir a escola.");
            },
        });
    }
});


$(document).on("click", ".editTurma", function () {
    var turmaId = $(this).data("id");

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

    // envia os dados do formulário pro servidor
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







$(document).on("click", ".delete-turmas", function () {
    var turmaId = $(this).data("id");
    if (confirm("Tem certeza que deseja excluir esta turma?")) {
        $.ajax({
            url: "/deleteTurma/" + turmaId,
            type: "DELETE",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                alert("Turma excluída com sucesso!");
                location.href = "/#turmas";
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                console.error(error);
                alert("Ocorreu um erro ao excluir a turma.");
            },
        });
    }
});

$(document).on("click", ".edit-button.editProf", function () {
    var professorId = $(this).data("id");
    console.log(professorId);

    $.get("/professor/edit/" + professorId, function (professor) {
        $('#editProfForm input[name="nome"]').val(professor.nome);
        $('#editProfForm input[name="id"]').val(professor.id);

        $("#editProfForm").attr("action", "/professor/update/" + professorId);

        $("#editProfModal").show();
        $(".modal-background").show();
    });
});

// Quando o usuário clica (x), fecha a modal
$(".close-button").click(function () {
    $("#editProfModal").hide();
    $(".modal-background").hide();
});

$("#editProfForm").on("submit", function (event) {
    event.preventDefault();

    var professorId = $('#editProfForm input[name="id"]').val();

    // envia os dados do formulário para o servidor
    $.ajax({
        url: "/professor/update/" + professorId,
        type: "POST",
        data: $(this).serialize(),
        success: function (response) {
            // Fechar a modal
            $("#editProfModal").hide();
            $(".modal-background").hide();

            alert(response.message);
            getProfessores();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
            console.log(jqXHR.responseText);
            alert(
                "Ocorreu um erro ao atualizar o professor. Por favor, tente novamente."
            );
        },
    });
});

$(document).on("click", ".deleteProf", function () {
    var professor_id = $(this).data("id");
    if (confirm("Tem certeza que deseja excluir este professor?")) {
        $.ajax({
            url: "/professor/" + professor_id,
            type: "DELETE",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (response) {
                alert("Professor excluído com sucesso!");
                location.href = "/#professores";
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                console.error(error);
                alert("Ocorreu um erro ao excluir o professor.");
            },
        });
    }
});


$(".content").on("click", ".vincularProf", function (e) {
    e.preventDefault();

    var professor_id = $(this).data("id");
    $("#vincularProfForm #professor_id").val(professor_id);

    $.ajax({
        url: "/getTurmas",
        method: "GET",
        success: function (data) {
            console.log(data);
            var select = $("#vincularProfForm #turma_id");
            select.html("");
            data.forEach(function (turma) {
                if (turma.nome_turma){
                    var option = $("<option>").val(turma.id).text(turma.nome_turma);
                    select.append(option);
                }
            });
            $("#vincularProfModal").show();
            $(".modal-background").show(); 
        },
    });
});

$("#vincularProfForm").submit(function (e) {
    e.preventDefault();

    $.ajax({
        url: $(this).attr("action"),
        method: "POST",
        data: $(this).serialize(),
        success: function (data) {
            if (data.success) {
                alert("Professor vinculado com sucesso!");
                $("#vincularProfModal").hide();
                $(".modal-background").hide(); 
            } else {
                alert("Ocorreu um erro ao vincular o professor.");
            }
        },
    });
});

$(".close-button").click(function () {
    $(".modal").hide(); 
    $(".modal-background").hide(); 
});
