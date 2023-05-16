# Inicie Educação Pokédex

Projeto desenvolvido para o teste de **Front-end da [Inicie](https://inicie.digital/)**, onde foi criado uma Pokédex usando a [PokéAPI](https://pokeapi.co/docs/v2), maiores informações sobre os [requisitos](https://docs.google.com/document/d/1gd9TQAthqJIhybIZBv4--c8fo_94xtOY4hksmk_M98E/edit#) e sobre o [layout proposto](https://www.figma.com/file/L2M9yaLX0hvKGa0mPwqZhu/Processo-Seletivo?node-id=3%3A449).

Projeto foi desenvolvido com versão **16 do Angular**, seguindo boas práticas do [Angular coding style guide](https://angular.io/guide/styleguide) e da comunidade, foi utilizado [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) para os commits do projeto, também foi utilizado **programação reativa** [RXJS](https://rxjs.dev/) e está configurado o [Eslint](https://eslint.org/) para validação do código e o [Prettier](https://prettier.io/) para formatação.

## Features extras

**Lottie animations** adicionado animações do [Lottie](https://lottiefiles.com/) usando o [lottie-web](https://www.npmjs.com/package/lottie-web) para listagem vazia e erros.

**Skeleton loading** adicionado **skeleton** na listagem e no detalhe dos Pokémons.

**Paginação** feito paginação no front para ser possível fazer busca do Pokémon por nome, foi utilizado o [swiperjs](https://swiperjs.com/get-started) no desktop e no mobile o [infinite scroll](https://www.npmjs.com/package/ngx-infinite-scroll) para fazer a paginação.

**Sistema de cache** foi feito um sistema de cache em memória para as informações dos Pokémons no **Interceptor**.

**Conversão de peso e altura** criado **pipe** que para conversão de peso de **hectograms para gramas e kg** e conversão de altura de **decimetres para cm e m**.

**Diretiva de image** foi criado uma diretiva para carregar uma imagem padrão em caso de falha para carregar a imagem do Pokémon.

**Botão voltar** adicionado botão voltar na tela de detalhe do Pokémon para facilitar a navegação do usuário.

## Pré-requisitos

Para conseguir instalar as dependências do projeto e rodar ele é necessário ter instalado na máquina a versão do **Node.js ^16.14.0 || ^18.10.0**, para maiores sobre como fazer a instalação, por favor acessar o [Node.js](https://nodejs.org/en).

## Rodar projeto pelo Docker

Para rodar o projeto pelo **Docker** é necessário estar instalado, configurado corretamente em sua máquina e rodando, maiores informações [Docker Instalação](https://docs.docker.com/desktop/), também precisa estar liberada a **porta 4200** para utilização, pois a **aplicação Angular** irá rodar nessa porta.

Caso queira rodar o projeto usando o [Docker](https://www.docker.com/) é só rodar o comando `npm run docker-start`, com esse comando ele irá criar um **container do Docker** e será possível executar a aplicação pelo **Docker**, caso não abra no navegador diretamente, acessar o [link](http://localhost:4200) no navegador, pode ser necessário desativar o firewall caso não esteja funcionando.

## Instalar dependências

Após baixar o projeto não se esquecer de fazer a **instalação de dependências** usando o comando `npm install` ou `npm i`, após a **instalação das dependências** pode prosseguir para o passo [Rodar o projeto local](#rodar-o-projeto-local).

## Rodar o projeto local

Antes desse passo excute [Instalar dependências](#instalar-dependências), após execução bem-sucedida, voltar para esse passo.

Para rodar o projeto **localmente** apenas é necessário rodar o comando `npm run start` no terminal já irá abrir o navegado com o projeto, caso queira também pode usar `ng serve` e abrir a url `http://localhost:4200/` no navegador.

## Rodar projeto na rede

Antes desse passo excute [Instalar dependências](#instalar-dependências), após execução bem-sucedida, voltar para esse passo.

Caso seja necessário realizar testes no projeto em um **dispositivo** é possível desde que ele esteja na mesma rede onde está rodando o projeto, somente é necessário rodar o comando `npm run host` para acessar pelo dispositivo utilizar a url `https://ip-do-seu-dispositivo-onde-esta-rodando-o-projeto:4200/#/evino/loja`, pode ser necessário desativar o firewall caso não esteja funcionando.

## ng generate

Antes desse passo excute [Instalar dependências](#instalar-dependências), após execução bem-sucedida, voltar para esse passo.

Execute no terminar `ng generate component nome-do-componente` para criar um novo componente. Você também pode utilizar `ng generate directive|pipe|service|class|guard|interface|enum|module`, maiores informações por favor consultar a documentação do [ng generate](https://angular.io/cli/generate).

## Build

Antes desse passo excute [Instalar dependências](#instalar-dependências), após execução bem-sucedida, voltar para esse passo.

Para buildar o projeto e gerar os arquivos de distribuição somente executar o comando `npm run build` no terminal, não existe distinção de ambientes, por questões da **API** não ter **ambientes diferentes**. Os arquivos gerados pelo build serão armazenados na pasta `dist/` na **raiz do projeto**.

Sempre rodar o `npm run build` antes de subir algum **commit** para garantir que o código não está com erro que não é pego no `ng serve`.

## Commits

Antes desse passo excute [Instalar dependências](#instalar-dependências), após execução bem-sucedida, voltar para esse passo.

Para comitar no projeto está sendo seguido o padrão do [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification), por isso é necessário rodar o comando `npm run commit` e seguir o padrão do **Conventional Commits**, dúvidas sobre qual opção escolher na hora de commitar, por favor consultar a [documentação oficial](https://www.conventionalcommits.org/en/v1.0.0/#specification).

## Versões do Projeto

Antes desse passo excute [Instalar dependências](#instalar-dependências), após execução bem-sucedida, voltar para esse passo.

Para gerar as versões do projeto está sendo seguido o padrão **Conventional Commits** e usado a lib [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/standard-changelog), quando for necessário gerar uma nova versão utilizar o comando `npm run release`, após isso executar o comando que aparece no terminal `git push --follow-tags origin (nome-da-branch)` para dar **push** da **tag do git** gerada.

## Para ajuda futura

Para futura ajuda e dúvidas, consultar a documentação do [Angular](https://angular.io/), [Material](https://material.angular.io/), [RXJS](https://rxjs.dev/), [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) e [Stack Overflow](https://stackoverflow.com/).
