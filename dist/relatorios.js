import { pedidos } from './pedidos.js';
import { produtos } from './produtos.js';
export function relatorioVendasTotais() {
    const totalGeral = pedidos.reduce((acc, p) => acc + p.total, 0);
    return {
        quantidadePedidos: pedidos.length,
        faturamentoTotal: totalGeral,
    };
}
export function relatorioEstoqueBaixo(limite = 5) {
    return produtos.filter((p) => p.estoque <= limite);
}
