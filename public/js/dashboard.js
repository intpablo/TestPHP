
loadEscolasTable();
// Função para carregar a tabela de escolas
function loadEscolasTable() {
    $.ajax({
        url: "/getEscolas",
        method: "GET",
        success: function(data) {
            $(".content").html(""); 
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
            data.forEach(function(escola) {
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
            });
            $(".content").append(table);
        },
    });
}

    
