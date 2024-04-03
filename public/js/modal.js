// modal.js
document.getElementById('modalBackground').addEventListener('click', function(event) {
    // Verifica se o clique foi no fundo do modal
    if (event.target === event.currentTarget) {
        // Esconde o modal
        document.getElementById('modalBackground').style.display = 'none';
        document.getElementById('professorModal').style.display = 'none';
        document.getElementById('turmaModal').style.display = 'none';
        document.getElementById('escolaModal').style.display = 'none';
    }
});

document.getElementById('cadastroProfessor').addEventListener('click', function() {
    document.getElementById('modalBackground').style.display = 'flex';
    document.getElementById('professorModal').style.display = 'block';
});

document.getElementById('cadastroTurma').addEventListener('click', function() {
    document.getElementById('modalBackground').style.display = 'flex';
    document.getElementById('turmaModal').style.display = 'block';
});

document.getElementById('cadastroEscola').addEventListener('click', function() {
    document.getElementById('modalBackground').style.display = 'flex';
    document.getElementById('escolaModal').style.display = 'block';
});
