# API com Node.js, MongoDB, Mongoose, Express e TypeScript (Arquitetura MSC + Routes)

Este é um guia de como configurar e desenvolver uma API utilizando Node.js, MongoDB, Mongoose, Express e TypeScript, seguindo uma arquitetura Model-Service-Controller (MSC) + Routes.

## Pré-requisitos

Certifique-se de que você tenha as seguintes ferramentas instaladas em sua máquina:

- Node.js: [Download](https://nodejs.org/)
- MongoDB: [Download](https://www.mongodb.com/try/download/community)
- Git (opcional, mas recomendado): [Download](https://git-scm.com/downloads)

## Configuração do Projeto

1. **Clonando o repositório:**

   ```bash
   git clone https://github.com/mauromaiodev/node-api-mongo-concepts
   cd node-api-mongo-concepts

2. **Instalando dependências:**

   ```bash
   npm install

3. **Crie um arquivo .env na raiz do projeto para armazenar as variáveis de ambiente. Exemplo:**

   ```bash
   MONGODB_URI=mongodb://localhost:27017/sua-base-de-dados

4. **A estrutura do projeto segue a arquitetura MSC + Routes: Exemplo:**

   ```bash
   src/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── services/
    └── index.ts

    controllers: Contém os controladores responsáveis por lidar com as requisições HTTP e interagir com os serviços.
    models: Define os modelos de dados utilizando o Mongoose.
    services: Implementa a lógica de negócio da aplicação.
    routes: Define as rotas da aplicação.
    index: Inicializa o servidor com o Express + Mongoose.

5. **Considerações Finais**

   Utilize ferramentas como Postman, Thunder CLient para testar as rotas da API.

   Este é um guia básico para configurar e desenvolver uma API utilizando Node.js, MongoDB, Mongoose, Express e TypeScript seguindo a arquitetura MSC + Routes.

   Sinta-se à vontade para adaptar e expandir esse guia de acordo com as necessidades do seu projeto.
