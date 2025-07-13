# Around the US - Projeto 12

## Descrição do Projeto

Around the US é uma aplicação web interativa que permite aos usuários compartilhar fotos de lugares visitados nos Estados Unidos. O projeto simula uma rede social onde os usuários podem:

- Visualizar e editar informações do perfil
- Adicionar novos cartões com fotos e descrições
- Curtir e descurtir cartões
- Excluir cartões próprios
- Atualizar foto do perfil

## Funcionalidades

### Gerenciamento de Perfil

- **Edição de dados**: Nome e descrição do usuário
- **Atualização de avatar**: Upload de nova foto de perfil via URL
- **Feedback visual**: Indicador de "Salvando..." durante operações

### Cartões Interativos

- **Visualização**: Grid responsivo de cartões com imagens
- **Adição**: Formulário para criar novos cartões
- **Curtidas**: Sistema de like/unlike com persistência
- **Exclusão**: Remoção de cartões próprios com confirmação
- **Popup de imagem**: Visualização ampliada das fotos

### Interface do Usuário

- **Design responsivo**: Adaptação para desktop, tablet e mobile
- **Popups modais**: Formulários e confirmações elegantes
- **Validação em tempo real**: Feedback imediato nos formulários
- **Estados de loading**: Indicadores visuais durante operações

## Tecnologias e Técnicas Utilizadas

### Frontend

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização com metodologia BEM
- **JavaScript ES6+**: Programação orientada a objetos
- **Modules**: Organização modular do código

### Arquitetura

- **Classes ES6**: Encapsulamento e reutilização
- **API RESTful**: Comunicação com servidor backend
- **Promises**: Programação assíncrona
- **Event Delegation**: Gerenciamento eficiente de eventos

### Metodologias

- **BEM**: Convenção de nomenclatura CSS
- **Mobile First**: Design responsivo
- **Progressive Enhancement**: Funcionalidades incrementais

## Estrutura de Arquivos

```
src/
├── components/           # Classes JavaScript
│   ├── Api.js           # Comunicação com API
│   ├── Card.js          # Componente de cartão
│   ├── FormValidator.js # Validação de formulários
│   ├── Popup.js         # Popup base
│   ├── PopupWithForm.js # Popup com formulário
│   ├── PopupWithImage.js # Popup de imagem
│   ├── PopupWithConfirmation.js # Popup de confirmação
│   ├── Section.js       # Renderização de seções
│   └── UserInfo.js      # Informações do usuário
├── pages/
│   ├── index.css        # Estilos principais
│   └── index.js         # Script principal
├── blocks/              # Estilos BEM por componente
├── images/              # Recursos visuais
├── vendor/              # Bibliotecas externas
└── index.html           # Página principal
```

## Classes Principais

### Api

Gerencia todas as comunicações com o servidor:

- `getUserInfo()` - Carrega dados do usuário
- `getInitialCards()` - Carrega cartões iniciais
- `updateUserInfo()` - Atualiza perfil
- `updateAvatar()` - Atualiza foto do perfil
- `addCard()` - Adiciona novo cartão
- `deleteCard()` - Remove cartão
- `likeCard()` / `unlikeCard()` - Gerencia curtidas

### Card

Representa um cartão individual:

- Renderização baseada em template
- Gerenciamento de eventos (like, delete, visualizar)
- Controle de visibilidade (botão delete apenas para owner)

### FormValidator

Validação universal de formulários:

- Validação HTML5 + ValidityState
- Controle de estado do botão submit
- Feedback visual de erros

### Popup (e subclasses)

Sistema modular de popups:

- **Popup**: Classe base com abertura/fechamento
- **PopupWithForm**: Formulários com submissão
- **PopupWithImage**: Visualização de imagens
- **PopupWithConfirmation**: Confirmações de ação

## Recursos de UX

### Validação

- **Tempo real**: Feedback imediato durante digitação
- **Estados visuais**: Indicadores de erro claros
- **Botões inteligentes**: Habilitados apenas quando válido

### Interações

- **Hover states**: Todos os elementos interativos
- **Loading states**: "Salvando..." durante operações
- **Confirmações**: Popup antes de excluir cartões
- **Keyboard support**: Fechamento com ESC

### Responsividade

- **Mobile first**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação fluida entre resoluções
- **Touch friendly**: Elementos adequados para toque

## Como Usar

1. **Instalação**: Configure um servidor local (Live Server recomendado)
2. **Navegação**: Abra `src/index.html` via servidor
3. **Perfil**: Clique no ícone de edição para alterar dados
4. **Avatar**: Hover sobre a foto para editar
5. **Cartões**: Use o botão "+" para adicionar novos cartões
6. **Interações**: Clique nos corações para curtir, lixeira para excluir

## API Integration

O projeto conecta-se à API da TripleTen para:

- Autenticação via token pessoal
- Persistência de dados do usuário
- Sincronização de cartões e curtidas
- Upload de avatares

## Compatibilidade

- **Navegadores**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Dispositivos**: Desktop, tablet, smartphone
- **Acessibilidade**: ARIA labels, alt texts, navegação por teclado

---

**Desenvolvido por**: Mateus Rosa  
**Curso**: TripleTen - Desenvolvimento Web  
**Projeto**: #12 - Around the US com API
