export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
}

export interface Cliente {
  id: string;
  nome: string;
  email: string;
}

export interface ItemCarrinho {
  produtoId: string;
  quantidade: number;
}

export interface ItemPedido {
  produtoId: string;
  nomeProduto: string;
  precoUnitario: number; // Preço guardado no momento da compra
  quantidade: number;
  subtotal: number;
}

export interface Pedido {
  id: string;
  clienteId: string;
  itens: ItemPedido[];
  total: number;
  data: Date;
}
