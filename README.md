# Mini-Projeto E-Commerce

## Estudante e Turma

- **Estudante:** Andson Oliveira da Silva
- **Curso / Turma:** Desenvolvimento Back-End / Carreira Tech (SENAI SC / SCTEC)

---

## Objetivo da Aplicacao

Desenvolver uma aplicação modular utilizando **TypeScript** e **Node.js** para simular um sistema de comércio eletrónico. A aplicação gere clientes, catálogo de produtos com controle de estoque, carrinho de compras interativo com subtotais, registo de pedidos com preço e relatórios, aplicando conceitos de orientação a objetos, tipagem estática e regras de integridade de dados.

---

## Funcionalidades Implementadas

- **Gestão de Clientes:**
  - Cadastro de novos clientes com validação de campos obrigatórios (nome e e-mail).
  - Listagem de clientes registados.
  - Busca de cliente por identificador único (`id`).
  - Restrição contra duplicação de IDs e e-mails.
- **Gestão de Produtos:**
  - Cadastro de produtos com validação de ID, preços positivos e estoque não negativo.
  - Listagem completa do catálogo.
  - Busca de produtos por parte do nome.
  - Filtro de produtos por categoria.
  - Atualização de preço e estoque de produtos existentes.
- **Carrinho de Compras:**
  - Adição de produtos ao carrinho com validação de estoque disponível.
  - Remoção de itens do carrinho.
  - Alteração da quantidade de itens.
  - Listagem dos itens do carrinho exibindo o **subtotal** de cada produto.
  - Cálculo do **valor total da compra**.
- **Gestão de Pedidos:**
  - Finalização de pedidos associados a um cliente registado.
  - Travamento de preços no momento da compra.
  - Baixa automática no estoque dos produtos ao fechar o pedido.
- **Relatórios:**
  - Relatório de vendas totais (quantidade de pedidos e faturamento acumulado).
  - Relatório de produtos com estoque baixo.

---

## Tecnologias Utilizadas

- **Linguagem:** TypeScript (com módulos ES / `NodeNext`)
- **Runtime:** Node.js
- **Interface:** Consola CLI nativa com o módulo `readline` e estilização por códigos ANSI escape.
- **Ferramentas:** Git, GitHub, Visual Studio Code, TypeScript Compiler (`tsc`).

---

## Estrutura dos Arquivos

```text
miniprojeto-ecommerce/
│
├── dist/                  # Ficheiros JavaScript compilados (gerados automaticamente)
├── node_modules/          # Dependências do projeto
├── src/                   # Código-fonte em TypeScript
│   ├── carrinho.ts        # Lógica de operações do carrinho e subtotais
│   ├── clientes.ts        # Gestão e validações de clientes
│   ├── main.ts            # Ponto de entrada, menu interativo e loop principal
│   ├── menu.ts            # Definição de ecrãs do menu com formatação ANSI
│   ├── pedidos.ts         # Regras de fecho de pedidos e baixa de stock
│   ├── produtos.ts        # Gestão do catálogo, buscas e atualizações
│   └── types.ts           # Definição de interfaces e tipos globais
│
├── package.json           # Configuração do projeto e dependências Node.js
├── tsconfig.json          # Configuração do compilador TypeScript
└── README.md              # Documentação oficial do projeto
```
