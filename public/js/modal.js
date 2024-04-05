// modals do formulario inicial

document.getElementById('modalBackground').addEventListener('click', function(event) {
    // verifica se o clique foi no fundo do modal 
    if (event.target === event.currentTarget) {
        // Esconde o modal
        document.getElementById('modalBackground').style.display = 'none';
        document.getElementById('professorModal').style.display = 'none';
     
    }
});

document.getElementById('cadastroProfessor').addEventListener('click', function() {
    document.getElementById('modalBackground').style.display = 'flex';
    document.getElementById('professorModal').style.display = 'block';
});


