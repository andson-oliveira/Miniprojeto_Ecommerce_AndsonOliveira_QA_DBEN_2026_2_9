export const produtos = [
    {
        id: 'p1',
        nome: 'Smartphone X',
        categoria: 'Eletrônicos',
        preco: 1500.0,
        estoque: 10,
    },
    {
        id: 'p2',
        nome: 'Fone Bluetooth',
        categoria: 'Eletrônicos',
        preco: 250.0,
        estoque: 15,
    },
    {
        id: 'p3',
        nome: 'Camiseta Básica',
        categoria: 'Vestuário',
        preco: 50.0,
        estoque: 30,
    },
];
export function cadastrarProduto(produto) {
    if (!produto.nome || produto.nome.trim() === '') {
        throw new Error('O nome do produto não pode estar vazio.');
    }
    if (produto.preco <= 0) {
        throw new Error('O preço deve ser maior que zero.');
    }
    if (produto.estoque < 0) {
        throw new Error('O estoque não pode ser negativo.');
    }
    if (produtos.some((p) => p.id === produto.id)) {
        throw new Error(`Já existe um produto com o ID ${produto.id}.`);
    }
    produtos.push(produto);
}
export function listarProdutos() {
    return produtos;
}
export function buscarProdutoPorId(id) {
    return produtos.find((p) => p.id === id);
}
export function buscarProdutosPorNome(termo) {
    return produtos.filter((p) => p.nome.toLowerCase().includes(termo.toLowerCase()));
}
export function filtrarProdutosPorCategoria(categoria) {
    return produtos.filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase());
}
export function atualizarProduto(id, dados) {
    const produto = buscarProdutoPorId(id);
    if (!produto) {
        throw new Error('Produto não encontrado.');
    }
    if (dados.preco !== undefined && dados.preco <= 0) {
        throw new Error('O preço deve ser maior que zero.');
    }
    if (dados.estoque !== undefined && dados.estoque < 0) {
        throw new Error('O estoque não pode ser negativo.');
    }
    Object.assign(produto, dados);
}
export function removerProduto(id) {
    const index = produtos.findIndex((p) => p.id === id);
    if (index === -1) {
        throw new Error('Produto não encontrado.');
    }
    produtos.splice(index, 1);
}
