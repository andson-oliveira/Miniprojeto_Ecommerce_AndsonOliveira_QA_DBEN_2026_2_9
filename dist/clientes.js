export const clientes = [
    { id: 'c1', nome: 'Ana Souza', email: 'ana@email.com' },
    { id: 'c2', nome: 'Carlos Lima', email: 'carlos@email.com' },
    { id: 'c3', nome: 'Beatriz Costa', email: 'beatriz@email.com' },
];
export function cadastrarCliente(cliente) {
    if (!cliente.nome || cliente.nome.trim() === '') {
        throw new Error('Nome do cliente obrigatório.');
    }
    if (!cliente.email || !cliente.email.includes('@')) {
        throw new Error('E-mail inválido.');
    }
    if (clientes.some((c) => c.id === cliente.id)) {
        throw new Error('ID de cliente já utilizado.');
    }
    if (clientes.some((c) => c.email === cliente.email)) {
        throw new Error('E-mail já cadastrado.');
    }
    clientes.push(cliente);
}
export function listarClientes() {
    return clientes;
}
export function buscarClientePorId(id) {
    return clientes.find((c) => c.id === id);
}
