const url = 'https://api.github.com/users/gutoffline';

const validacao = dados => {
    if(!dados.ok){
        throw new Error(`Erro ao buscar dados no github. Status: ${dados.status}`);
    }
    return dados.json();
}

const montarCartao = dados => {
    document.querySelector(".cartao img").src = dados.avatar_url;
    document.querySelector(".cartao img").alt = dados.name;
    document.querySelector(".cartao h1").innerText = dados.name;
    document.querySelector(".cartao a").innerText = dados.login;
    document.querySelector(".cartao a").href = dados.html_url;
}

const tratamentoDeErro = erro => {
    console.log(erro.message);
}

fetch(url)
    .then(validacao)
    .then(montarCartao)
    .catch(tratamentoDeErro);