# Clients MFEs

## Executando

Este repositório contém um projeto Angular estruturado com microfrontends (MFEs). Ele pode ser executado de três formas:

1. **Acessando via URL hospedada**
2. **Rodando localmente sem Docker**
3. **Rodando com Docker**

### 1. Acessando via URL

A forma mais simples de testar a aplicação é acessando diretamente:

🔗 [https://clients-mfes-shell.vercel.app/](https://clients-mfes-shell.vercel.app/)

Porém, é importante destacar há problemas de CORS na versão em deploy no vercel. Utilizando o Vercel rewrites é possível realizar requisições GET, mas o problema persistiu para outras requisições. Portanto, recomendo testar utilizando Docker.

### 2. Rodando com Docker

Para rodar o projeto via Docker, basta executar o docker compose do projeto:

``` $ docker compose up --build ```

E acessar em: http://localhost:4200/

As aplicações serão expostar nas seguintes portas:

1. **Shell** (aplicação principal): 4200
2. **Design System** : 4201
5. **Tela de entrada** : 4202
3. **Tela de Clientes** : 4203
4. **Tela de Clientes selecionados** : 4204


### 3. Rodando localmente sem Docker

Para rodar o projeto localmente sem docker, siga os seguintes passos:

#### Pré-requisitos

- **Node.js**: O projeto utiliza Angular 19, que requer uma versão compatível do Node.js (versão 18 ou superior).

#### Instalando dependências

Na raiz do projeto, executar o comando de instalação das dependências:

``` $ npm install ```

#### Executando as aplicações

Na raiz do projeto, executar o comando:

``` $ npm run start:all ```

Com isso, as aplicações serão levantadas nas seguintes endereços:

1. **Shell** (aplicação principal): http://localhost:4200
2. **Design System** : http://localhost:4201
5. **Tela de entrada** : http://localhost:4202
3. **Tela de Clientes** : http://localhost:4203
4. **Tela de Clientes selecionados** : http://localhost:4204
