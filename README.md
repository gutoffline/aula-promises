## **Promise é um objeto usado para processamento assíncrono. Um Promise (de "promessa") representa um valor que pode estar disponível agora, no futuro ou nunca.**

***Uma promise é um objeto que representa o sucesso ou a falha de uma operação assíncrona***
<br><br>
### **O que é uma operação assíncrona?**


```javascript

console.log('Síncrono 1');

setTimeout(() => console.log('Timeout 2'), 0);

Promise.resolve().then(() => console.log('Promise 3'));

console.log('Síncrono 4');

```
o código javascript é executado em uma única thread, isso significa que que esse código só pode fazer uma coisa de cada vez, a maioria do código javascript que você escreve é executado de cima para baixo, passo-a-passo de forma síncrona. É esse sincronismo que possibilite que quando a gente invoque duas funções sequencialmente, a execução da segunda função só aconteceça após a execução da primeira terminar.

O código síncrono espera uma ação ser finalizada antes de partir para a uma próxima ação. Mas o javascript também executa assíncrono.

Ex:
```javascript
let numeroAleatorio = 9;

setTimeout(() => {
    numeroAleatorio += 10;
    console.log(numeroAleatorio)
}, 2000);

console.log(numeroAleatorio);
```

A linha 1 e a linha 8 são duas linhas de código síncrono ou seja, elas são executadas de cima para baixo, sequencialmente passo-a-passo, só que a gente tem um timer inserido entre essas duas linhas, mesmo que esse timer esteja posicionado entre o código síncrono o javascript não espera 2 segundos para ler as próximas linhas de código, ele executa os códigos síncronos direto e depois de 2 segundos executa o código dentro do timer, por isso o número 9 foi exibido antes do número 19 no console. O javascript leu o `setTimeout`, iniciou a contagem de segundos desse `setTimeout` mas continuou a executar o código abaixo do `setTimeout`. 

<br><br>

## ***Código assíncrono pode iniciar um processo agora e finalizar esse processo posteriormente*** 

<br><br>

## ***Requests são um exemplo de operação assíncrona***
Imagine que você quer utilizar a API do github para pegar alguns dados, você vai precisar fazer um request e esse request é assíncrono, pq essa operação vai ser passada para uma thread separada e os códigos que você escreveu depois desse request vai continuar executando as funções que ele tem que executar. O javascript que a gente escreve é executado em uma única thread mas os requests, as requisições são entregues para uma thread separada que é executada fora da thread do javascript, e isso é o que faz o resto do seu código ser executado enquanto esse request é processado. 

Exemplo gráfico de síncrono e assíncrono https://miro.com/welcomeonboard/aWp2aWlnV2p2WlRjS3BONUNlNDlQelVqQ0JyMkpWRmU0Z204UWNubUhlUmVhT1Zad3NXZzM2ZGdDZ1R1Y0R3bHwzMDc0NDU3MzQ4MDE4Mzk2NTI2

<br><br>

## ***Voltando a falar sobre promises***
Uma promise pode envolver/encapsular operações assíncronas.

### Vantagens de utilizar promises
- Você ganha mais controle e legibilidade no fluxo de lógicas assíncronas
- Você reduz o acoplamento entre função e callback
- Você tem mais previsibilidade e detalhamento no tratamento de erros

### Como criar uma promise
Em muitos casos você vai apenas utilizar uma promise já criada, como em um biblioteca por exemplo. Nós vamos fazer dois exemplos, vamos criar uma promise e depois vamos utilizar uma promise existente.

Promise é uma função construtora que precisa receber uma função como argumento, função essa que será o nosso código assíncrono a ser executado:
```javascript
const minhaPromise = new Promise( () => {});
```

Quando a gente cria uma promise, essa função que a gente passou como argumento precisa receber dois parâmetros: *resolve* e *reject*
```javascript
const minhaPromise = new Promise( (resolve, reject) => {});
```
Esses parâmetros podem ter outros nomes, mas esses nomes são uma convensão univerval que eu recomendo que você siga. O *resolve* e o *reject* são duas funções que podem ser invocadas dentro dessa função que estamos criando. A *resolve* é a função que deve ser invocada quando a operação assíncrona que a gente fizer tiver sucesso, e, a *reject* deve ser invocada quando a operação assíncrona falhar.

Dentro da função podemos escrever o código que quisermos, por enquanto vamos declarar uma variável *numeroAleatorio* e chamar a função *resolve*, esquece o *reject* por enquanto.
```javascript
const minhaPromise = new Promise( (resolve, reject) => {
    const numeroAleatorio = 10;
    resolve();
});
```
Uma vez criada essa *promise*, em algum lugar do código vamos ter que executar ela. Um pouco mais pra baixo vamos executar essa promise e encadear um método *then* que também recebe uma função por argumento. 
```javascript
const minhaPromise = new Promise( (resolve, reject) => {
    const numeroAleatorio = 10;
    resolve();
});

minhaPromise.then(() => {});
```

Esse método *then* é o responsável por receber a resposta de sucesso da *promise*. Se na criação da *promise* a gente especificar um valor como argumento da invocação do *resolve*, esse valor vai ser recebido como parâmetro dessa função que a gente passou para a invocação do *then*.
```javascript
const minhaPromise = new Promise( (resolve, reject) => {
    const numeroAleatorio = 10;
    resolve(35);
});

minhaPromise.then(valor => {});
```
Sendo assim, na invocação do resolve vamos passar a variável *numeroAleatorio* e na função do *then* vamos receber essa variável em um parâmetro chamado *valor*. Agora dentro da função vamos exibir no console o valor recebido.
```javascript
const minhaPromise = new Promise( (resolve, reject) => {
    const numeroAleatorio = 10;
    resolve(numeroAleatorio);
});

minhaPromise.then(valor => {
    console.log(valor);
});
```
Veja que no console foi exibido o valor que passamos como argumento. Veja que apenas a utilização do *resolve* foi suficiente para passar o valor para a função no *then*, não foi necessário utilizar um *return* como estamos acostumados a retornar valor. O mesmo acontece com *reject*.

Vamos relembrar o que fizemos até aqui:
- criamos uma *promise* que envolve uma função
- criamos uma resposta pra quando a resolução da *promise* é bem sucedida
- através do *resolve* passamos um valor para o parâmetro da função do *then*

Uma característica forte de uma *promise* é que ela pode ser encadeada, a gente pode colocar um outro *then* no final do *then* anterior. Vamos alterar a nossa chamada da *promise*, vamos começar removendo as *chaves* e o *console.log* e apenas retornar o valor que foi passado por parâmetro. 
```javascript
const minhaPromise = new Promise( (resolve, reject) => {
    const numeroAleatorio = 10;
    resolve(numeroAleatorio);
});

minhaPromise
    .then(valor => valor);
```
No final do *then* vamos quebrar a linha e encadear outro *then*, esse *then* recebe uma função e essa função que esse segundo *then* recebe vai receber por parâmetro o valor que o *then* anterior retornou. Para comprovar isso a gente vai receber o valor e dentro da função vamos declarar um *console.log* que exibe esse valor no *console*. 
```javascript
const minhaPromise = new Promise( (resolve, reject) => {
    const numeroAleatorio = 10;
    resolve(numeroAleatorio);
});

minhaPromise
    .then(valor => valor)
    .then(valor => {
        console.log(valor);
    });
```
Só é possível a gente fazer esse encadeamento porque o método *then* sempre retorna uma nova *promise* que por sua vez possui um método *then* disponível por padrão. Ou seja, um *then* pode ser encadeado no outro quantas vezes forem necessárias.

### Tratamento de erros
Existe um outro método que pode ser encadeado no then que é o método catch e ele também recebe uma função como arqgumento. E é usando essa função como argumento dentro do catch que você vai cuidar do que deve acontecer quando a resposta obtida da operação não for uma resposta de sucesso. O catch só será excutado em 2 situações:

1. Quando o método reject, dentro da função da criação da promise for invocado.
2. Quando o código dentro de algum then lança um erro. 

Dentro da função de criação da *promise*, vamos comentar o *resolve* e na linha abaixo invocar o *reject*. Essa invocação do *reject* também precisa receber um valor como argumento. 
```javascript
const minhaPromise = new Promise( (resolve, reject) => {
    const numeroAleatorio = 10;
    //resolve(numeroAleatorio);
    reject(numeroAleatorio);
});

minhaPromise
    .then(valor => valor)
    .then(valor => {
        console.log(valor);
    });
```
Esse valor também é recebido como parâmetro na função passada para o *catch*.
```javascript
const minhaPromise = new Promise( (resolve, reject) => {
    const numeroAleatorio = 10;
    //resolve(numeroAleatorio);
    reject(numeroAleatorio);
});

minhaPromise
    .then(valor => valor)
    .then(valor => {
        console.log(valor);
    })
    .catch(valorErro => {
        console.log(valorErro);
    });
```
Acabamos de ver a sintaxe de uma pomise, como ela é criada e como podemos utilizar ela. Vamos agora pra um exemplo mais prático.

## Exemplo prático com promise - Exemplo 01
Vamos fazer uma requisição para uma API que retorna uma imagem aleatória de um gatinho. Vamos começar declarando uma const url que recebe a url pra qual a gente vai fazer o request.
Abaixo dessa const a gente vai invocar o método fetch e passar a url como argumento. O método fetch faz uma requisição http e traz os dados da url que a gente especificou como argumento.
```javascript
const url = 'https://api.thecatapi.com/v1/images/search';
fetch(url)
```
Abra a aba REDE e a gente vê que a requisição do tipo fetch foi feita e quando a gente clica nessa requisição (search), na aba VISUALIZAÇÃO a gente vê os dados que essa requisição trouxe, que é um objeto com as propriedades breeds, height, id, url, width.

O método fetch retorna uma promise, se a gente declarar um console.log e passar o fetch, no console a gente verá um objeto do tipo promise.
```javascript
const url = 'https://api.thecatapi.com/v1/images/search';
console.log(fetch(url));
```
Essa promise está com o estado pendente(pending) que é o estado inicial de uma promise. O estado pendente indica que a operação dessa promise nem foi concluída com sucesso nem que falhou, é só o estado inicial dela, se a gente investigar o prototype dela, a gente encontra os métodos then e catch da promise. 

Agora vamos remover esse console.log e usar essa promise que o fetch retorna, declarando um then e passando uma função que recebe o parâmetro dadosDoGato.

```javascript
const url = 'https://api.thecatapi.com/v1/images/search';
fetch(url)
    .then(dadosDoGato => {
        
    });
```
Dentro da função vamos inserir um if para verificar se os dados do gato não foram retornados.
```javascript
const url = 'https://api.thecatapi.com/v1/images/search';
fetch(url)
    .then(dadosDoGato => {
        if(!dadosDoGato.ok){
            
        }
    });
```
Essa propriedade .ok retorna um boolean indicando se HttpStatusCode dessa resposta obtida está entre 200 e 299. Se tiver, significa que essa requisição foi bem sucedida, se não tiver, que é o que estamos verificando a gente vai criar um erro, pois lembre que o catch é chamado ou quando o reject é invocado ou quando dentro do then é retornado um erro. 
```javascript
const url = 'https://api.thecatapi.com/v1/images/search';
fetch(url)
    .then(dadosDoGato => {
        if(!dadosDoGato.ok){
            throw new Error(`Aconteceu algum erro. Status: ${dadosDoGato.status}`);
        }
    });
```
No final do then, vamos encadear a invocação de um catch que recebe uma função que recebe erro por parâmetro, que é o erro que lançamos no if. Dentro da função vamos inserir um console.log que exiba a mensagem do erro. 
```javascript
const url = 'https://api.thecatapi.com/v1/images/search';
fetch(url)
    .then(dadosDoGato => {
        if(!dadosDoGato.ok){
            throw new Error(`Aconteceu algum erro. Status: ${dadosDoGato.status}`);
        }
    })
    .catch(erro => {
        console.log(erro.message);
    });
```
Para vermos esse tratamento de erro funcionando, a gente vai remover o !(not) do if. Agora veja no console a mensagem de erro aparecendo.

Vamos voltar o !(not), e abaixo do if vamos colocar um console.log para exibir o conteúdo de dadosDoGato.
```javascript
fetch(url)
    .then(dadosDoGato => {
        if(!dadosDoGato.ok){
            throw new Error(`Aconteceu algum erro. Status: ${dadosDoGato.status}`);
        }
        console.log(dadosDoGato);
    })
    .catch(erro => {
        console.log(erro.message);
    });
```

Veja que a resposta da requisição foi um objeto response, esse tipo de objeto é obtido no retorno de uma operação que envolve uma api. Agora pra gente poder ter acesso aos dados que a gente realmente quer, aquele que vemos em visualização, precisamos fazer o parse do texto do body dessa resposta para json. Para isso vamos fazer um return em dadosDoGato.json()
```javascript
const url = 'https://api.thecatapi.com/v1/images/search';
fetch(url)
    .then(dadosDoGato => {
        if(!dadosDoGato.ok){
            throw new Error(`Aconteceu algum erro. Status: ${dadosDoGato.status}`);
        }
        return dadosDoGato.json();
    })
    .catch(erro => {
        console.log(erro.message);
    }
    );
```
Essa invocação `return dadosDoGato.json();` retorna uma promise, e como a gente tem um return retornando essa promise a gente pode encadear um segundo then que recebe uma função que recebe como parâmetro esse json que tem a propriedade url que a gente precisa. No parâmetro da função podemos fazer uma desestruturação para obter apenas o objeto que possui a propriedade url. Depois disso, dentro da função, colocamos um console.log para verificar se a imagem realmente é obtida através da propriedade url
```javascript
const url = 'https://api.thecatapi.com/v1/images/search';
fetch(url)
    .then(dadosDoGato => {
        if(!dadosDoGato.ok){
            throw new Error(`Aconteceu algum erro. Status: ${dadosDoGato.status}`);
        }
        
        return dadosDoGato.json();
    })
    .then(([dadosDoGato]) => {
        console.log(dadosDoGato.url);
    })
    .catch(erro => {
        console.log(erro.message);
    });
```    

Agora que já obtemos as imagens, vamos criar no html um img com id "meu-gato" e atribuir a imagem ao src de meu-gato.

```html
    <img src="" id="meu-gato">
```

```javascript
const url = 'https://api.thecatapi.com/v1/images/search';
fetch(url)
    .then(dadosDoGato => {
        if(!dadosDoGato.ok){
            throw new Error(`Aconteceu algum erro. Status: ${dadosDoGato.status}`);
        }
        
        return dadosDoGato.json();
    })
    .then(([dadosDoGato]) => {
        document.querySelector("#meu-gato").src = dadosDoGato.url;
    })
    .catch(erro => {
        console.log(erro.message);
    });
```


## Exemplo prático 2 - Cartão do Github
```html
<div class="cartao">
    <img>
    <h1></h1>
    <a></a>
</div>
<script src="exemplo.js"></script>
```

```javascript
const url = 'https://api.github.com/users/gutoffline';

const validacao = dados=>{
    if(!dados.ok){
        throw new Error(`Aconteceu algum erro. Status: ${dados.status}`);
    }
    
    return dados.json();
}

const montarCartao = dados => {
    console.log(dados);
    document.querySelector(".cartao img").src = dados.avatar_url;
    document.querySelector(".cartao img").alt = dados.name;
    document.querySelector(".cartao h1").innerText = dados.name;
    document.querySelector(".cartao a").innerText = `@${dados.login}`;
    document.querySelector(".cartao a").href = dados.html_url;
}

const tratamentoErro = erro => {
    console.log(erro.message);
}

fetch(url)
    .then(validacao)
    .then(montarCartao)
    .catch(tratamentoErro);

```    
## Refências
- https://www.w3schools.com/js/js_promise.asp
- https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises
- https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
- https://docs.thecatapi.com/
- https://apilist.fun/
- https://canaltech.com.br/produtos/o-que-e-thread/
- https://docs.github.com/en/rest
