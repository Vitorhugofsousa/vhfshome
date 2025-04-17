# Portfólio de Analista de Dados

Este é um portfólio pessoal desenvolvido por Vitor Hugo F. Sousa, analista de dados. O site apresenta uma interface moderna e minimalista com suporte a tema escuro/claro.

## Características

- Design responsivo e moderno
- Tema escuro/claro com persistência de preferência
- Seção de habilidades organizada por categorias
- Exibição de projetos com links para GitHub e Vercel
- Download do currículo em PDF
- Animações suaves e efeitos visuais
- Navegação intuitiva

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Font Awesome para ícones

## Como Usar

1. Clone este repositório
2. Abra o arquivo `index.html` em seu navegador
3. Para adicionar seu currículo:
   - Adicione o arquivo PDF do seu currículo em `source/cv/Vitor_Hugo_F_Sousa_CV.pdf`
4. Para adicionar seus projetos:
   - Edite o arquivo `source/projects.json` com os detalhes dos seus projetos
   - Adicione imagens dos projetos na pasta `source/img/`

## Personalização

Para personalizar o site:

1. Edite o arquivo `index.html` para atualizar suas informações
2. Modifique as cores no arquivo `styles.css` (variáveis CSS)
3. Adicione seus próprios projetos no arquivo `source/projects.json`

## Estrutura do Projeto

```
portfolio/
├── index.html
├── styles.css
├── script.js
├── README.md
└── source/
    ├── cv/
    │   └── Vitor_Hugo_F_Sousa_CV.pdf
    ├── ico/
    │   └── (ícones do site)
    ├── img/
    │   └── (imagens dos projetos)
    └── projects.json
```

## Configuração de Projetos

Para adicionar ou editar projetos, modifique o arquivo `source/projects.json`. Cada projeto deve seguir este formato:

```json
{
    "titulo": "Nome do Projeto",
    "descricao": "Descrição do projeto",
    "github": "https://github.com/seu-usuario/repositorio",
    "vercel": "https://seu-projeto.vercel.app",
    "imagem": "/source/img/nome-da-imagem.png"
}
```

