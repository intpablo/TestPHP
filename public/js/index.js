document.getElementById("adicionarTurmaGeral").addEventListener("click", function (e) {
        e.preventDefault();
        var novosCamposTurma = document.createElement("div");
        novosCamposTurma.innerHTML = `
        <input type="text" name="turmas[nome][]" placeholder="Nome da turma">
        <input type="text" name="turmas[turno][]" placeholder="Turno">
    `;
        document.getElementById("turmas").appendChild(novosCamposTurma);
    });

$("#cadGeral").on("submit", function (e) {
    e.preventDefault();
    var form = this;

    $.ajax({
        url: "/cadastroGeral",
        type: "POST",
        data: $(this).serialize(),
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            if (response.success) {
                alert(response.success);
                console.log();
                form.reset();
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            console.error(error);
            alert("Ocorreu um erro ao cadastrar a escola e as turmas.");
        },
    });
});

$("#formProf").on("submit", function(e) {
    e.preventDefault();
    var form = this;
    
    $.ajax({
        url: "/cadastroProfessor",
        type: "POST",
        data: $(this).serialize(),
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function(response) {
            if (response.success) {
                alert("Professor cadastrado com sucesso!");
                form.reset();
                location.reload(true);
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            console.error(error);
            alert("Ocorreu um erro ao cadastrar o professor.");
        },
    });
});

$(document).ready(function () {
    $("#acessarRegistros").click(function () {
        window.location.href = "/dashboard";
    });
});
