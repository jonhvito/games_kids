# EduKids — Plataforma de Jogos Educativos

Uma plataforma web escalável para abrigar múltiplos minijogos educativos infantis, desenvolvida com **React**, **TypeScript** e **Tailwind CSS**.

## 🎮 Jogos Disponíveis

A plataforma inclui inicialmente três jogos educativos:

1. **Jogo de Contas com Ilustrações**  
   Aprenda matemática de forma divertida com alimentos no lugar de números.

2. **Jogo de Encontrar Objetos**  
   Encontre alimentos escondidos em imagens divertidas e coloridas.

3. **Caça-Palavras Temático**  
   Encontre palavras relacionadas a alimentos em um divertido caça-palavras.

## 🚀 Como Começar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd gameKids
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse [http://localhost:5173](http://localhost:5173) no seu navegador.

## 📁 Estrutura do Projeto

```
gameKids/
├── public/                # Arquivos públicos (sons, etc)
│   └── sounds/            # Arquivos de áudio dos jogos
├── src/
│   ├── components/        # Componentes reutilizáveis (Navbar, Footer, QRCode, etc)
│   │   ├── MathGame/
│   │   ├── FindObjectsGame/
│   │   └── WordSearchGame/
│   ├── games/             # Lógica e telas dos jogos
│   │   ├── MathGame/
│   │   ├── FindObjectsGame/
│   │   └── WordSearchGame/
│   ├── layouts/           # Layouts reutilizáveis
│   ├── pages/             # Páginas principais (Home, etc)
│   ├── utils/             # Funções utilitárias (sons, QR code, etc)
│   ├── App.tsx            # Componente principal e roteamento
│   ├── main.tsx           # Ponto de entrada
│   └── index.css          # Estilos globais (Tailwind)
├── package.json
└── README.md
```

## 📝 Como Adicionar um Novo Jogo

1. **Crie uma nova pasta para o jogo**  
   Em `src/games`, crie uma pasta, ex: `QuizGame`.

2. **Implemente os componentes do jogo**  
   Siga a estrutura:
   - `QuizGame.tsx` — Componente principal do jogo
   - `QuizGameInstructions.tsx` — Instruções do jogo
   - `quizGameUtils.ts` — Lógica/utilitários do jogo
   - Outros componentes específicos

3. **Adicione o jogo ao roteador**  
   Em [`src/App.tsx`](src/App.tsx):
   ```tsx
   <Route path="games/quiz" element={<QuizGame soundEnabled={soundEnabled} />} />
   ```

4. **Adicione o jogo à página inicial**  
   Em [`src/pages/HomePage.tsx`](src/pages/HomePage.tsx):
   ```tsx
   {
     title: 'Quiz Educativo',
     description: 'Teste seus conhecimentos com perguntas divertidas!',
     imageUrl: 'URL_DA_IMAGEM',
     path: '/games/quiz',
     color: 'border-yellow-500',
     colorBg: 'bg-yellow-500',
     icon: <QuestionAnswer size={24} className="text-yellow-500" />
   }
   ```

5. **Implemente os recursos do jogo**
   - Instruções claras para as crianças
   - Feedback visual e sonoro (use [`QRCodeGenerator`](src/components/QRCodeGenerator.tsx), [`SoundEffect`](src/components/SoundEffect.tsx))
   - Responsividade para diferentes dispositivos

## 🔒 Boas Práticas

- **Modularidade:** Cada jogo deve ser autocontido com seus próprios componentes, estilos e lógica.
- **Reutilização:** Use componentes compartilhados sempre que possível.
- **Consistência:** Mantenha a experiência do usuário consistente entre os jogos.
- **Acessibilidade:** Garanta que os jogos sejam acessíveis para todas as crianças.
- **Responsividade:** Teste os jogos em diferentes tamanhos de tela.

## 🌟 Recursos Extras

- **QR Code:** Cada jogo gera um QR Code para acesso rápido em dispositivos móveis.
- **Sons:** Sistema de sons para feedback durante o jogo.
- **Instruções:** Cada jogo possui instruções claras e acessíveis.
- **Design Responsivo:** Interface adaptada para desktop e mobile.
- **Música de Fundo:** Opção de ativar/desativar música ambiente.

## 🔧 Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/) (ícones)
- [Framer Motion](https://www.framer.com/motion/) (animações)
- [React Confetti](https://www.npmjs.com/package/react-confetti) (efeitos visuais)

## � Deploy no GitHub Pages

Para publicar a aplicação no GitHub Pages:

1. Certifique-se de que o repositório está no GitHub (ex: `https://github.com/jonhvito/games_kids`).

2. Execute o build para produção:
   ```bash
   npm run build
   ```

3. Faça commit e push dos arquivos, incluindo a pasta `docs/`:
   ```bash
   git add .
   git commit -m "Build para GitHub Pages"
   git push origin main
   ```

4. No repositório GitHub:
   - Vá para **Settings** > **Pages**.
   - Em **Source**, selecione **Deploy from a branch**.
   - Escolha o branch **main** e a pasta **/docs**.
   - Clique em **Save**.

5. A aplicação estará disponível em `https://jonhvito.github.io/games_kids/`.

## �📄 Licença

Este projeto está licenciado sob a licença MIT.