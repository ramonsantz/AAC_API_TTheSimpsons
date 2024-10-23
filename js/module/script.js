let todosPersonagens = [];

// Função para criar os cards dos personagens
const setCreatCard = function (dadosPersonagens) {
    let divCardPersonagens = document.getElementById('cardPersonagem');
    divCardPersonagens.innerHTML = ''; // Limpa os cards existentes

    dadosPersonagens.forEach((personagem) => {
        let divCaixaPersonagem = document.createElement('div');
        let h2CaixaNome = document.createElement('h2');
        let figureCaixaImagem = document.createElement('figure');
        let imgPersonagem = document.createElement('img');
        let divCaixaDetalhes = document.createElement('div');
        let pCaixaDescricao = document.createElement('p');

        let textoNome = document.createTextNode(personagem.Nombre); // Usa 'Nombre'
        let textoDescricao = document.createTextNode(personagem.Historia); // Usa 'Historia'

        divCaixaPersonagem.setAttribute('class', 'caixa_produto');
        h2CaixaNome.setAttribute('class', 'caixa_titulo');
        figureCaixaImagem.setAttribute('class', 'caixa_imagem');
        imgPersonagem.setAttribute('src', personagem.Imagen); // Usa 'Imagen' para a imagem
        imgPersonagem.setAttribute('alt', personagem.Nombre);
        imgPersonagem.setAttribute('title', personagem.Nombre);
        divCaixaDetalhes.setAttribute('class', 'caixa_texto');

        divCardPersonagens.appendChild(divCaixaPersonagem);
        divCaixaPersonagem.appendChild(h2CaixaNome);
        h2CaixaNome.appendChild(textoNome);
        divCaixaPersonagem.appendChild(figureCaixaImagem);
        figureCaixaImagem.appendChild(imgPersonagem);
        divCaixaPersonagem.appendChild(divCaixaDetalhes);
        divCaixaDetalhes.appendChild(pCaixaDescricao);
        pCaixaDescricao.appendChild(textoDescricao);
    });
}

// Função para buscar todos os personagens da API
const getDadosPersonagensAPI = async function () {
    let url = 'https://apisimpsons.fly.dev/api/personajes?limit=1000';
    let response = await fetch(url);
    let dados = await response.json();
    todosPersonagens = dados.docs; // Armazena todos os personagens
    setCreatCard(todosPersonagens); // Mostra todos os personagens na página
}

// Evento de carregamento da página
window.addEventListener('load', function () {
    getDadosPersonagensAPI();

    // Evento para o botão de busca
    document.getElementById('botaoBusca').addEventListener('click', function () {
        const termo = document.getElementById('pesquisa').value;
        filtrarPersonagens(termo);
    });

    // Evento para buscar ao pressionar 'Enter'
    document.getElementById('pesquisa').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const termo = document.getElementById('pesquisa').value;
            filtrarPersonagens(termo);
        }
    });
});

// Função para filtrar os personagens
const filtrarPersonagens = function (termo) {
    const personagensFiltrados = todosPersonagens.filter(personagem => 
        personagem.Nombre.toLowerCase().includes(termo.toLowerCase()) || personagem._id.includes(termo) // Filtra por Nome ou ID
    );
    setCreatCard(personagensFiltrados);
}
