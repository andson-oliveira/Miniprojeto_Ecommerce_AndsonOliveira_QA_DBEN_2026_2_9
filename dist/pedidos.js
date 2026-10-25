import { buscarClientePorId } from './clientes.js';
import { listarCarrinho, limparCarrinho } from './carrinho.js';
import { buscarProdutoPorId } from './produtos.js';
export const pedidos = [];
export function finalizarPedido(clienteId) {
    const cliente = buscarClientePorId(clienteId);
    if (!cliente) {
        throw new Error('Cliente não encontrado.');
    }
    const itensCarrinho = listarCarrinho();
    if (itensCarrinho.length === 0) {
        throw new Error('Carrinho vazio.');
    }
    for (const item of itensCarrinho) {
        const produto = buscarProdutoPorId(item.produtoId);
        if (!produto || produto.estoque < item.quantidade) {
            throw new Error(`Estoque insuficiente para ${item.nome}.`);
        }
    }
    const itensPedido = [];
    let total = 0;
    for (const item of itensCarrinho) {
        const produto = buscarProdutoPorId(item.produtoId);
        produto.estoque -= item.quantidade;
        itensPedido.push({
            produtoId: item.produtoId,
            nomeProduto: produto.nome,
            precoUnitario: produto.preco,
            quantidade: item.quantidade,
            subtotal: produto.preco * item.quantidade,
        });
        total += produto.preco * item.quantidade;
    }
    const novoPedido = {
        id: `PED-${Date.now()}`,
        clienteId,
        itens: itensPedido,
        total,
        data: new Date(),
    };
    pedidos.push(novoPedido);
    limparCarrinho();
    return novoPedido;
}
export function listarPedidos() {
    return pedidos;
}
export function buscarPedidosPorCliente(clienteId) {
    return pedidos.filter((p) => p.clienteId === clienteId);
}
