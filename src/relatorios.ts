import { pedidos } from './pedidos.js';
import { produtos } from './produtos.js';
import { Pedido, Produto } from './types.js';

export function relatorioVendasTotais() {
  const totalGeral = pedidos.reduce(
    (acc: number, p: Pedido) => acc + p.total,
    0,
  );
  return {
    quantidadePedidos: pedidos.length,
    faturamentoTotal: totalGeral,
  };
}

export function relatorioEstoqueBaixo(limite: number = 5) {
  return produtos.filter((p: Produto) => p.estoque <= limite);
}
