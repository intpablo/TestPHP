

loadEscolasTable();
// Função para carregar a tabela de escolas assim que entra no dashboard


function loadEscolasTable() {
    

    $.ajax({
        url: "/getEscolas",
        method: "GET",
        success: function (data) {
            $(".content").html("");
            var table = $("<table>").addClass("table");
            var thead = $("<thead>")
                .addClass("header-row")
                .append(
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
                var row = $("<tr>")
                    .addClass("row")
                    .append(
                        "<td>" + escola.nome_escola + "</td>",
                        "<td>" + escola.endereco + "</td>",
                        "<td>" + escola.inep + "</td>",
                        "<td>" + escola.status + "</td>",
                        $("<td>").append(
                            "<button class='edit-button editSchool' data-id='" +
                                escola.id +
                                "' title='Editar Escola'><i class='fa-solid fa-pen'></i></button>",
                            "<button class='delete-button delete-school' data-id='" +
                                escola.id +
                                "' title='Excluir Escola'><i class='fa-solid fa-trash-can'></i></button>"
                        )
                    );
                tbody.append(row);
            });
            table.append(thead, tbody);
            $(".content").append(table);
        },
    });
}
