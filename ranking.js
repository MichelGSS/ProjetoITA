// ranking.js

/**
 * Função para voltar à página anterior
 */
function voltar() {
    window.history.back();
}

/**
 * Função para inicializar os usuários no localStorage (se necessário)
 * Você pode adicionar dados fictícios aqui se desejar iniciar com alguns usuários
 */
function inicializarUsuarios() {
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuariosExistentes.length > 0) {
        return; // Se já houver usuários, não inicializa dados fictícios
    }

    // Exemplo de usuários fictícios (opcional)
    const usuariosFicticios = [
        {
            nome: 'Alice',
            senha: 'alice123',
            livrosMarcados: ['1984', 'O Pequeno Príncipe'],
            pontosTotais: 25,
            trofeus: 3,
            livrosPorCategoria: {
                'Mais Lidos': 2
            }
        },
        {
            nome: 'Bob',
            senha: 'bob456',
            livrosMarcados: ['Dom Quixote', 'Moby Dick', 'Orgulho e Preconceito'],
            pontosTotais: 40,
            trofeus: 5,
            livrosPorCategoria: {
                'Clássicos': 3
            }
        },
        {
            nome: 'Carol',
            senha: 'carol789',
            livrosMarcados: ['O Nome do Vento'],
            pontosTotais: 15,
            trofeus: 2,
            livrosPorCategoria: {
                'Mais Lidos': 1
            }
        }
    ];

    // Salva os usuários fictícios no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosFicticios));
}

/**
 * Função para atualizar o ranking na tabela
 */
function atualizarRanking() {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = ''; // Limpa a lista existente

    // Recupera os usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se há usuários registrados
    if (usuarios.length === 0) {
        rankingList.innerHTML = `
            <tr>
                <td colspan="5">Nenhum usuário registrado.</td>
            </tr>
        `;
        return;
    }

    // Valida a estrutura dos dados dos usuários
    const usuariosValidados = usuarios.filter(user => {
        return user.nome && typeof user.pontosTotais === 'number' && typeof user.trofeus === 'number' && Array.isArray(user.livrosMarcados);
    });

    if (usuariosValidados.length === 0) {
        rankingList.innerHTML = `
            <tr>
                <td colspan="5">Nenhum usuário válido encontrado.</td>
            </tr>
        `;
        return;
    }

    // Ordena os usuários por pontosTotais (decrescente)
    usuariosValidados.sort((a, b) => b.pontosTotais - a.pontosTotais);

    // Preenche a tabela com os dados do ranking
    usuariosValidados.forEach((usuario, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.livrosMarcados.length}</td>
            <td>${usuario.pontosTotais}</td>
            <td>${usuario.trofeus} Troféus</td>
        `;
        rankingList.appendChild(tr);
    });
}

/**
 * Função que é chamada quando o documento está completamente carregado
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os usuários (opcional)
    inicializarUsuarios();

    // Atualiza o ranking
    atualizarRanking();
});
