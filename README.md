# 📇 Gestor de Contatos com React e Firebase

Este é um projeto de um gestor de contatos simples, desenvolvido com **React.js** e **Firebase**.  
A aplicação permite aos utilizadores **criar, ler, atualizar e apagar contatos**, com todos os dados a serem guardados em tempo real na base de dados do **Firestore**.

---

## 🚀 Link da Aplicação (Live Demo)

A aplicação está a rodar aqui:  
🔗 [https://react-contact-manager-sage.vercel.app/](https://react-contact-manager-sage.vercel.app/)

---

## ✨ Funcionalidades

- 🔐 **Autenticação Anónima**: Cada utilizador tem a sua própria lista de contatos privada.
- 📁 **Operações CRUD**: Funcionalidade completa para Criar, Ler, Atualizar e Apagar contatos.
- ☁️ **Persistência de Dados**: Integração com o Firebase Firestore para guardar os dados na nuvem.
- 🔄 **Atualizações em Tempo Real**: A lista de contatos atualiza-se automaticamente com as alterações na base de dados.
- 📱 **Interface Responsiva**: Design moderno e adaptável a dispositivos móveis.
- 🔍 **Filtro de Contatos**: Pesquisa dinâmica na lista de contatos.
- ✅ **Modal de Confirmação**: Mensagem de confirmação para evitar exclusões acidentais.

---

## 🛠️ Tecnologias Utilizadas

- **React.js** – Biblioteca principal para a construção da interface.
- **Vite** – Ferramenta de build para um desenvolvimento rápido.
- **Firebase** – Plataforma utilizada para:
  - Firestore: Base de dados NoSQL.
  - Authentication: Autenticação anónima de utilizadores.
- **CSS Puro** – Estilização sem frameworks, com variáveis CSS para um tema consistente.
- **Lucide Icons** – Biblioteca de ícones leve e moderna.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de que tem o seguinte instalado na sua máquina:

- Node.js (versão 16 ou superior)
- npm ou yarn

---

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto localmente:

# **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

# **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

# **Configure as Variáveis de Ambiente:**

   Este projeto precisa de se conectar ao Firebase. Para isso, você precisa fornecer as suas chaves de API através de um ficheiro de ambiente.

   a. Crie um ficheiro chamado `.env` na raiz do projeto.  
   b. Copie o conteúdo abaixo para o seu novo ficheiro `.env`:

   ```env
   VITE_FIREBASE_API_KEY="SUA_API_KEY"
   VITE_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
   VITE_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
   VITE_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
   VITE_FIREBASE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
   VITE_FIREBASE_APP_ID="SEU_APP_ID"
   VITE_FIREBASE_MEASUREMENT_ID="SEU_MEASUREMENT_ID"
   ```

   c. Substitua os valores `SUA_...` pelas suas credenciais reais do Firebase, que pode encontrar nas definições do seu projeto no [Firebase Console](https://console.firebase.google.com/).

---

## ▶️ Como Rodar o Projeto

Depois de instalar as dependências e configurar o ficheiro `.env`, execute o seguinte comando para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada no seu terminal).

---

## 🚀 Deploy na Vercel

Para fazer o deploy deste projeto na **Vercel**, lembre-se de que o ficheiro `.env` **não** é enviado para o repositório.

Você precisará configurar as mesmas variáveis de ambiente (começando com `VITE_`) diretamente no dashboard do seu projeto na Vercel, em:

`Settings > Environment Variables`

---

Feito com 💙 por **Kerolayne Bianeck**
