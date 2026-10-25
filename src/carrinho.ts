// src/carrinho.ts
import { ItemCarrinho } from './types.js';
import { buscarProdutoPorId } from './produtos.js';

export let carrinho: ItemCarrinho[] = [];

export function adicionarAoCarrinho(
  produtoId: string,
  quantidade: number,
): void {
  if (quantidade <= 0) {
    throw new Error('A quantidade deve ser maior que zero.');
  }
  const produto = buscarProdutoPorId(produtoId);
  if (!produto) {
    throw new Error('Produto não encontrado.');
  }

  const itemExistente = carrinho.find((i) => i.produtoId === produtoId);
  const qtdAtual = itemExistente ? itemExistente.quantidade : 0;

  if (qtdAtual + quantidade > produto.estoque) {
    throw new Error(
      `Estoque insuficiente. Disponível em estoque: ${produto.estoque}`,
    );
  }

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({ produtoId, quantidade });
  }
}

export function removerDoCarrinho(produtoId: string): void {
  const index = carrinho.findIndex((i) => i.produtoId === produtoId);
  if (index === -1) {
    throw new Error('O item não está no carrinho.');
  }
  carrinho.splice(index, 1);
}

export function alterarQuantidadeCarrinho(
  produtoId: string,
  novaQuantidade: number,
): void {
  if (novaQuantidade <= 0) {
    removerDoCarrinho(produtoId);
    return;
  }

  const produto = buscarProdutoPorId(produtoId);
  if (!produto) {
    throw new Error('Produto não encontrado.');
  }

  if (novaQuantidade > produto.estoque) {
    throw new Error(
      `Quantidade excede o estoque disponível (${produto.estoque}).`,
    );
  }

  const item = carrinho.find((i) => i.produtoId === produtoId);
  if (!item) {
    throw new Error('Item não encontrado no carrinho.');
  }

  item.quantidade = novaQuantidade;
}

export function listarCarrinho() {
  return carrinho.map((item) => {
    const produto = buscarProdutoPorId(item.produtoId)!;
    const subtotal = produto.preco * item.quantidade;
    return {
      produtoId: item.produtoId,
      nome: produto.nome,
      precoUnitario: produto.preco,
      quantidade: item.quantidade,
      subtotal: subtotal, // Calcula e retorna o subtotal de cada item
    };
  });
}

export function calcularTotalCarrinho(): number {
  return listarCarrinho().reduce((acc, item) => acc + item.subtotal, 0);
}

export function limparCarrinho(): void {
  carrinho = [];
}
