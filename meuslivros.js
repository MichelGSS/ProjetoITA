// meuslivros.js

// Função para carregar e exibir a lista de livros marcados do usuário atual
function carregarLivrosMarcados() {
    const usuarioNome = sessionStorage.getItem('usuarioNome');
    if (!usuarioNome) {
        alert('Você precisa estar logado para ver seus livros marcados.');
        window.location.href = 'login.html';
        return;
    }

    // Recupera a lista de usuários do localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Encontra o usuário atual
    let usuario = usuarios.find(user => user.nome === usuarioNome);

    if (!usuario) {
        alert('Usuário não encontrado.');
        window.location.href = 'login.html';
        return;
    }

    // Obtém a lista de livros marcados do usuário
    let livrosMarcados = usuario.livrosMarcados || [];

    const lista = document.getElementById('listaLivrosMarcados');
    lista.innerHTML = ''; // Limpa a lista antes de preenchê-la

    if (livrosMarcados.length === 0) {
        lista.innerHTML = '<li>Nenhum livro marcado.</li>';
    } else {
        livrosMarcados.forEach(livro => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="book-item">
                    <span class="book-title">${livro}</span>
                </div>
            `;
            lista.appendChild(li);
        });
    }
}

// Função para voltar à página anterior
document.getElementById("btnVoltar").addEventListener("click", function () {
    window.history.back(); // Retorna à página anterior
});

// Função para abrir o modal e mostrar a imagem do livro
function visualizarLivro(imagemUrl) {
    // Atualiza a imagem do livro no modal
    const bookImage = document.getElementById('bookImage');
    bookImage.src = imagemUrl;

    // Exibe o modal adicionando a classe 'show'
    const modal = document.getElementById('bookModal');
    modal.classList.add('show');
}

// Função para fechar o modal quando o usuário clica no botão de fechar
document.querySelector('.close').addEventListener('click', () => {
    const modal = document.getElementById('bookModal');
    modal.classList.remove('show');
});

// Fecha o modal se o usuário clicar fora da área do modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('bookModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarLivrosMarcados);
