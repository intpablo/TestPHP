document.getElementById("adicionarTurmaGeral").addEventListener("click", function (e) {
    e.preventDefault();
    var novosCamposTurma = document.createElement("div");
    novosCamposTurma.innerHTML = `
        <input type="text" name="turmas[nome][]" placeholder="Nome da turma">
        <input type="text" name="turmas[turno][]" placeholder="Turno">
    `;
    document.getElementById("turmas").appendChild(novosCamposTurma);
});

$(document).ready(function(){
    $("#acessarRegistros").click(function(){
      window.location.href = '/dashboard';
      
    });
  });
  