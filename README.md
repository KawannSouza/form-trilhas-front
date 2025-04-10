# 📝 FormTrilhas - Sistema de Inscrição Trilhas Inova

FormTrilhas é um sistema completo de cadastro e login de candidatos para processos seletivos, permitindo o registro de dados pessoais, upload de currículo e geração de comprovantes em PDF. 

## 🚀 Funcionalidades

- Registro com dados obrigatórios (nome, e-mail, senha) e opcionais (CPF, CEP, UF, logradouro, currículo)
- Login seguro com autenticação via JWT
- Painel do usuário com visualização e edição de dados
- Geração de comprovante de inscrição em PDF
- Validações de campos e feedback com notificações

## 🧰 Tecnologias

### Front-end
- React.js + TailwindCSS
- Axios, Toastify, Framer Motion
- JsPDF para gerar PDFs

### Back-end
- Node.js + Express.js
- Prisma (ORM) com MongoDB
- JWT para autenticação

### APIs externas
- ViaCEP (busca de endereço por CEP)

## 🗂 Estrutura do Projeto

- `form-trilhas-front`: aplicação React
- `form-trilhas-api`: API Node.js com Express
- Banco de dados NoSQL (MongoDB)

## ⚙️ Como Executar Localmente

### Front-end
```bash
cd form-trilhas-front
npm install
npm run dev
```

### Back-end
```bash
cd form-trilhas-api
npm install

# Criar um arquivo .env com:
# DATABASE_URL=<sua_string_de_conexão>
# JWT_SECRET=<sua_chave_secreta>

npm run dev
```

Acesse via: [http://localhost:5173](http://localhost:5173)

## 🔐 Autenticação JWT

1. Login gera um token JWT
2. Token é armazenado no `localStorage`
3. É necessário enviá-lo no header `Authorization` para acessar rotas protegidas

## 🌐 Links

- 🧪 [API - Swagger Docs](https://form-trilhas-api.onrender.com/api-docs/)
- 🔗 [Aplicação Web](https://form-trilhas-front.vercel.app/)
- 📦 [Repositório Front-end](https://github.com/KawannSouza/form-trilhas-front)
- 🔧 [Repositório Back-end](https://github.com/KawannSouza/form-trilhas-api)

## 📌 Considerações Finais

FormTrilhas é um sistema flexível, pronto para evoluir conforme novas demandas surgirem. Seu foco é oferecer uma experiência simples, segura e funcional aos usuários.
