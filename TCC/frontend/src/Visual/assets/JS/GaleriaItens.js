let todosOsItens = [];

async function carregarItens() {
    try {
        const resposta = await fetch('http://localhost:8080/v1/Items');
        todosOsItens = await resposta.json();
        atualizarGaleria(todosOsItens);
    } catch (erro) {
        console.error("Erro ao carregar itens:", erro);
        alert("Erro ao carregar itens do estoque.");
    }
}

function atualizarGaleria(itensFiltrados) {
    const container = document.getElementById('container-itens');
    const placeholder = document.getElementById('placeholder');

    container.innerHTML = '';

    if (itensFiltrados.length === 0) {
        placeholder.style.display = 'block';
    } else {
        placeholder.style.display = 'none';

        itensFiltrados.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card-item');

            const imagem = item.imagem ? item.imagem : 'assets/images/sem-imagem.png';
            const descricaoCompleta = item.descricao || 'Sem descrição';
            const descricaoResumida = descricaoCompleta.length > 40
                ? descricaoCompleta.substring(0, 40) + '...'
                : descricaoCompleta;

            const imagemElem = document.createElement('img');
            imagemElem.src = imagem;
            imagemElem.alt = item.nomeItem;

            const titulo = document.createElement('h3');
            titulo.textContent = item.nomeItem;

            const descricao = document.createElement('p');
            descricao.classList.add('descricao');
            descricao.setAttribute('data-completa', descricaoCompleta);
            descricao.textContent = descricaoResumida;

            const quantidade = document.createElement('p');
            quantidade.textContent = `Quantidade: ${item.quantidade}`;

            card.appendChild(imagemElem);
            card.appendChild(titulo);
            card.appendChild(descricao);

            if (descricaoCompleta.length > 40) {
                const botao = document.createElement('button');
                botao.classList.add('btn-toggle-descricao');
                botao.textContent = 'Ler mais';
                botao.addEventListener('click', () => {
                    const textoCompleto = descricao.getAttribute('data-completa');
                    if (botao.textContent === 'Ler mais') {
                        descricao.textContent = textoCompleto;
                        botao.textContent = 'Ler menos';
                    } else {
                        descricao.textContent = textoCompleto.substring(0, 40) + '...';
                        botao.textContent = 'Ler mais';
                    }
                });
                card.appendChild(botao);
            }

            card.appendChild(quantidade);
            container.appendChild(card);
        });
    }
}

function configurarBusca() {
    const campoPesquisa = document.getElementById('pesquisa-itens');

    campoPesquisa.addEventListener('input', () => {
        const termo = campoPesquisa.value.trim().toLowerCase();

        const itensFiltrados = todosOsItens.filter(item =>
            item.nomeItem.toLowerCase().includes(termo)
        );

        atualizarGaleria(itensFiltrados);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    carregarItens();
    configurarBusca();
});
