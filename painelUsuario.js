// Exibe o nome do usuário na tela
document.addEventListener('DOMContentLoaded', () => {
    const usuarioNome = document.getElementById('usuarioNome');
    const nome = sessionStorage.getItem('usuarioNome');

    if (nome) {
        usuarioNome.textContent = nome;
    } else {
        alert('Nome de usuário não encontrado.');
        window.location.href = 'login.html'; // Redireciona para a página de login se o nome do usuário não estiver disponível
    }

    // Após carregar o conteúdo, atualiza os botões de "Marcar Leitura"
    atualizarBotoesMarcarLeitura();
});

// Função de logout
document.getElementById('logout').addEventListener('click', () => {
    alert('Você saiu com sucesso!');
    sessionStorage.removeItem('usuarioNome'); // Remove o nome do usuário da sessão
    window.location.href = 'login.html'; // Redireciona para a página de login
});

// Objeto contendo os detalhes dos livros
const livros = {
    "A Sombra do Vento": {
        paginas: 600,
        descricao: "Um jovem chamado Daniel descobre um livro misterioso que o leva a uma jornada de segredos e revelações.",
        genero: "Romance histórico"
    },
    "1984": {
        paginas: 328,
        descricao: "Uma distopia onde o governo controla tudo, inclusive os pensamentos dos cidadãos.",
        genero: "Ficção distópica"
    },
    "O Pequeno Príncipe": {
        paginas: 96,
        descricao: "Uma história poética sobre um jovem príncipe que explora planetas e encontra personagens únicos.",
        genero: "Fábula"
    },
    "O Nome do Vento": {
        paginas: 662,
        descricao: "A história de um jovem prodígio chamado Kvothe que se torna um lendário mago.",
        genero: "Fantasia"
    },
    "A Menina que Roubava Livros": {
        paginas: 584,
        descricao: "Durante a Segunda Guerra Mundial, uma jovem encontra consolo nos livros enquanto o mundo ao seu redor desmorona.",
        genero: "Ficção histórica"
    },
    "A Vida Invisível de Addie LaRue": {
        paginas: 448,
        descricao: "Uma jovem faz um pacto para viver para sempre, mas acaba sendo esquecida por todos que conhece.",
        genero: "Fantasia"
    },
    "O Império dos Vampiros": {
        paginas: 752,
        descricao: "Uma batalha épica entre humanos e vampiros em um mundo devastado.",
        genero: "Fantasia sombria"
    },
    "O Problema dos Três Corpos": {
        paginas: 400,
        descricao: "Uma série de eventos leva a um possível contato com uma civilização alienígena.",
        genero: "Ficção científica"
    },
    "A Filha do Rei do Pântano": {
        paginas: 320,
        descricao: "Um suspense psicológico sobre uma jovem tentando desvendar os segredos do passado de sua família.",
        genero: "Suspense"
    },
    "Dom Quixote": {
        paginas: 1050,
        descricao: "As aventuras e desventuras do famoso cavaleiro errante e seu fiel escudeiro.",
        genero: "Clássico"
    },
    "Moby Dick": {
        paginas: 720,
        descricao: "A obsessiva caçada do Capitão Ahab pela baleia Moby Dick.",
        genero: "Aventura"
    },
    "Orgulho e Preconceito": {
        paginas: 432,
        descricao: "A vida e os relacionamentos da protagonista Elizabeth Bennet na Inglaterra do século XIX.",
        genero: "Romance"
    },
    "Jane Eyre": {
        paginas: 500,
        descricao: "Uma jovem órfã supera desafios e descobre o amor verdadeiro.",
        genero: "Romance gótico"
    }
};

// Função para visualizar o livro
function visualizarLivro(livro, imagemUrl) {
    // Atualiza a imagem do livro no modal
    const bookImage = document.getElementById('bookImage');
    bookImage.src = imagemUrl;

    // Pegar os detalhes do livro
    const detalhesLivro = livros[livro];
    
    // Criar conteúdo para mostrar ao lado da imagem
    let modalContent = `
        <h2>${livro}</h2>
        <p><strong>Páginas:</strong> ${detalhesLivro.paginas}</p>
        <p><strong>Descrição:</strong> ${detalhesLivro.descricao}</p>
        <p><strong>Gênero:</strong> ${detalhesLivro.genero}</p>
        <div class="modal-buttons">
            <button id="marcarLeituraBtn">Marcar Leitura</button>
            <button id="desmarcarLeituraBtn">Desmarcar Leitura</button>
            <button id="voltarBtn">Voltar</button>
        </div>
    `;
    
    // Adicionar as novas informações ao lado da imagem
    const modalText = document.getElementById('bookDetails');
    modalText.innerHTML = modalContent;

    // Exibe o modal adicionando a classe 'show'
    const modal = document.getElementById('bookModal');
    modal.classList.add('show');

    // Adiciona eventos para os botões de "Marcar Leitura", "Desmarcar Leitura" e "Voltar"
    document.getElementById('marcarLeituraBtn').addEventListener('click', () => {
        marcarLeitura(livro, detalhesLivro.paginas, detalhesLivro.genero);
        modal.classList.remove('show'); // Fecha o modal após marcar leitura
    });

    document.getElementById('desmarcarLeituraBtn').addEventListener('click', () => {
        desmarcarLeitura(livro);
        modal.classList.remove('show'); // Fecha o modal após desmarcar
    });

    document.getElementById('voltarBtn').addEventListener('click', () => {
        modal.classList.remove('show'); // Fecha o modal sem marcar
    });
}

// Função para marcar a leitura de um livro
function marcarLeitura(livro, paginas, categoria) {
    // Recupera o nome do usuário logado
    const usuarioNome = sessionStorage.getItem('usuarioNome');
    if (!usuarioNome) {
        alert('Você precisa estar logado para marcar uma leitura.');
        return;
    }

    // Recupera a lista de usuários do localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Encontra o usuário atual
    let usuario = usuarios.find(user => user.nome === usuarioNome);

    if (!usuario) {
        alert('Usuário não encontrado.');
        return;
    }

    // Inicializa propriedades do usuário caso não existam
    usuario.livrosMarcados = usuario.livrosMarcados || [];
    usuario.pontosTotais = usuario.pontosTotais || 0;
    usuario.trofeus = usuario.trofeus || 0;
    usuario.livrosPorCategoria = usuario.livrosPorCategoria || {};

    // Verifica se o livro já está na lista
    if (!usuario.livrosMarcados.includes(livro)) {
        // Adiciona o livro à lista
        usuario.livrosMarcados.push(livro);

        // Calcula pontos
        let pontos = 1 + Math.floor(paginas / 100);
        usuario.pontosTotais += pontos;

        // Atualiza a contagem de livros por categoria
        usuario.livrosPorCategoria[categoria] = (usuario.livrosPorCategoria[categoria] || 0) + 1;

        // Verifica se o usuário ganhou algum troféu
        if (usuario.livrosPorCategoria[categoria] % 5 === 0) {
            usuario.trofeus += 1;
            alert(`Parabéns! Você ganhou um troféu por ler 5 livros da categoria ${categoria}.`);
        }

        // Atualiza os dados do usuário no array de usuários
        let usuarioIndex = usuarios.findIndex(user => user.nome === usuarioNome);
        usuarios[usuarioIndex] = usuario;

        // Salva as atualizações no localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Mostra o resumo atualizado do usuário
        alert(`Pontos Totais: ${usuario.pontosTotais} | Troféus: ${usuario.trofeus}`);

        // Atualiza os botões de "Marcar Leitura"
        atualizarBotoesMarcarLeitura();
    } else {
        alert(`O livro "${livro}" já foi marcado.`);
    }
}

// Função para desmarcar a leitura de um livro
function desmarcarLeitura(livro) {
    const usuarioNome = sessionStorage.getItem('usuarioNome');
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuario = usuarios.find(user => user.nome === usuarioNome);

    if (!usuario) {
        alert('Usuário não encontrado.');
        return;
    }

    if (usuario.livrosMarcados.includes(livro)) {
        usuario.livrosMarcados = usuario.livrosMarcados.filter(l => l !== livro);
        let paginas = livros[livro].paginas;
        let pontos = 1 + Math.floor(paginas / 100);
        usuario.pontosTotais -= pontos;

        // Atualiza a contagem de livros por categoria
        let categoria = livros[livro].genero; // Assumindo que a categoria é o gênero do livro
        usuario.livrosPorCategoria[categoria] -= 1;

        // Atualiza os dados do usuário no array de usuários
        let usuarioIndex = usuarios.findIndex(user => user.nome === usuarioNome);
        usuarios[usuarioIndex] = usuario;

        // Salva as atualizações no localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert(`Você desmarcou o livro "${livro}". Pontos Totais: ${usuario.pontosTotais}`);
        atualizarBotoesMarcarLeitura(); // Atualiza os botões
    } else {
        alert(`O livro "${livro}" não está marcado.`);
    }
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

// Função para atualizar o ranking na tabela
function atualizarRanking() {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = ''; // Limpa a lista existente

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Ordena os usuários por pontos (decrescente)
    usuarios.sort((a, b) => b.pontosTotais - a.pontosTotais);

    // Popula a tabela com os dados do ranking
    usuarios.forEach((usuario, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.livrosMarcados.length}</td>
            <td>${usuario.pontosTotais}</td>
            <td class="trofeu">${usuario.trofeus} Troféus</td>
        `;
        rankingList.appendChild(tr);
    });
}

// Função para atualizar os botões de "Marcar Leitura" conforme os livros já marcados
function atualizarBotoesMarcarLeitura() {
    const usuarioNome = sessionStorage.getItem('usuarioNome');
    if (!usuarioNome) {
        return;
    }

    // Recupera a lista de usuários do localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Encontra o usuário atual
    let usuario = usuarios.find(user => user.nome === usuarioNome);

    if (!usuario) {
        return;
    }

    // Obtém a lista de livros marcados do usuário
    let livrosMarcados = usuario.livrosMarcados || [];

    // Seleciona todos os botões de "Marcar Leitura"
    const botoesMarcarLeitura = document.querySelectorAll('.btn-marcar-leitura');

    botoesMarcarLeitura.forEach(botao => {
        const livro = botao.getAttribute('data-book');

        if (livrosMarcados.includes(livro)) {
            // Desabilita o botão e altera o texto
            botao.disabled = true;
            botao.textContent = 'Já Marcado';
            botao.style.background = '#808080'; // Cor cinza para indicar desabilitado
            botao.style.cursor = 'not-allowed';
        } else {
            // Habilita o botão e restaura o texto original
            botao.disabled = false;
            botao.textContent = 'Marcar Leitura';
            botao.style.background = 'linear-gradient(45deg, #4b0082, #8a2be2)'; // Restaurar cor original
            botao.style.cursor = 'pointer';
        }
    });
}

// Chama as funções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarLivrosMarcados();
    atualizarRanking();
});
