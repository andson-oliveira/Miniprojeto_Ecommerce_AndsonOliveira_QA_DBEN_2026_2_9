// src/menu.ts
const RESET = '\x1b[0m';
const BRIGHT_YELLOW = '\x1b[93m';
const BRIGHT_GREEN = '\x1b[92m';
const BRIGHT_RED = '\x1b[91m';
const CYAN = '\x1b[36m';

const colorir = (texto: string, cor: string) => `${cor}${texto}${RESET}`;

export function exibirMenuPrincipal(): void {
  console.clear();
  console.log(colorir('=== MENU PRINCIPAL ===', CYAN));
  console.log(colorir('1 - Listar Clientes', BRIGHT_YELLOW));
  console.log(colorir('2 - Cadastrar Cliente', BRIGHT_YELLOW));
  console.log(colorir('3 - Buscar Cliente por ID', BRIGHT_YELLOW));
  console.log(colorir('4 - Cadastrar Produto', BRIGHT_YELLOW));
  console.log(colorir('5 - Listar Produtos', BRIGHT_YELLOW));
  console.log(colorir('6 - Buscar Produto por Nome', BRIGHT_YELLOW));
  console.log(colorir('7 - Filtrar Produtos por Categoria', BRIGHT_YELLOW));
  console.log(colorir('8 - Atualizar Produto', BRIGHT_YELLOW));
  console.log(colorir('9 - Pedidos', BRIGHT_YELLOW));
  console.log(colorir('10 - Relatórios', BRIGHT_YELLOW));
  console.log(colorir('11 - Carrinho', BRIGHT_YELLOW));
  console.log(colorir('0 - Sair do sistema', BRIGHT_RED));
}

export function exibirMenuCarrinho(): void {
  console.clear();
  console.log(colorir('=== CARRINHO ===', CYAN));
  console.log(colorir('1 - Adicionar produto', BRIGHT_GREEN));
  console.log(colorir('2 - Remover produto', BRIGHT_GREEN));
  console.log(colorir('3 - Alterar quantidade', BRIGHT_GREEN));
  console.log(colorir('4 - Listar carrinho', BRIGHT_GREEN));
  console.log(colorir('5 - Calcular total', BRIGHT_GREEN));
  console.log(colorir('6 - Finalizar pedido', BRIGHT_GREEN)); // <-- Opção essencial para gerar o pedido
  console.log(colorir('0 - Voltar', BRIGHT_RED));
}
