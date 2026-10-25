// src/main.ts
import { exibirMenuPrincipal, exibirMenuCarrinho } from './menu.js';
import {
  listarProdutos,
  cadastrarProduto,
  buscarProdutosPorNome,
  filtrarProdutosPorCategoria,
  atualizarProduto,
} from './produtos.js';
import {
  listarClientes,
  cadastrarCliente,
  buscarClientePorId,
} from './clientes.js';
import {
  adicionarAoCarrinho,
  removerDoCarrinho,
  alterarQuantidadeCarrinho,
  listarCarrinho,
  calcularTotalCarrinho,
} from './carrinho.js';
import { listarPedidos, finalizarPedido } from './pedidos.js';
import { relatorioVendasTotais, relatorioEstoqueBaixo } from './relatorios.js';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

type Estado = 'principal' | 'carrinho';
let estado: Estado = 'principal';

function loopMenu() {
  if (estado === 'principal') {
    exibirMenuPrincipal();
  } else {
    exibirMenuCarrinho();
  }

  rl.question('\nEscolha uma opção: ', (resp: string) => {
    const opcao = resp.trim();

    if (estado === 'principal') {
      switch (opcao) {
        case '1': // Listar Clientes
          console.log('\n--- CLIENTES CADASTRADOS ---', listarClientes());
          pausarEContinuar();
          break;
        case '2': // Cadastrar Cliente
          rl.question('\nID do cliente (ex: c4): ', (id) => {
            rl.question('Nome completo: ', (nome) => {
              rl.question('Endereço de e-mail: ', (email) => {
                try {
                  cadastrarCliente({
                    id: id.trim(),
                    nome: nome.trim(),
                    email: email.trim(),
                  });
                  console.log('\nCliente cadastrado com sucesso!');
                } catch (e: any) {
                  console.log('\nErro ao cadastrar cliente:', e.message);
                }
                pausarEContinuar();
              });
            });
          });
          return;
        case '3': // Buscar Cliente por ID
          rl.question('\nDigite o ID do cliente que procura: ', (id) => {
            const cliente = buscarClientePorId(id.trim());
            if (cliente) {
              console.log('\n--- CLIENTE ENCONTRADO ---', cliente);
            } else {
              console.log('\nCliente não encontrado com esse ID.');
            }
            pausarEContinuar();
          });
          return;
        case '4': // Cadastrar Produto
          rl.question('\nID do produto (ex: p4): ', (id) => {
            rl.question('Nome do produto: ', (nome) => {
              rl.question('Categoria: ', (categoria) => {
                rl.question('Preço unitário (ex: 99.90): ', (precoStr) => {
                  rl.question('Quantidade em estoque: ', (estoqueStr) => {
                    try {
                      cadastrarProduto({
                        id: id.trim(),
                        nome: nome.trim(),
                        categoria: categoria.trim(),
                        preco: parseFloat(precoStr),
                        estoque: parseInt(estoqueStr),
                      });
                      console.log('\nProduto cadastrado com sucesso!');
                    } catch (e: any) {
                      console.log('\nErro ao cadastrar:', e.message);
                    }
                    pausarEContinuar();
                  });
                });
              });
            });
          });
          return;
        case '5': // Listar Produtos
          console.log('\n--- PRODUTOS NO CATÁLOGO ---', listarProdutos());
          pausarEContinuar();
          break;
        case '6': // Buscar por Nome
          rl.question(
            '\nDigite parte do nome do produto que procura: ',
            (termo) => {
              const resultados = buscarProdutosPorNome(termo.trim());
              console.log('\n--- RESULTADOS DA PESQUISA ---', resultados);
              pausarEContinuar();
            },
          );
          return;
        case '7': // Filtrar por Categoria
          rl.question(
            '\nDigite a categoria desejada (ex: Eletrônicos, Vestuário): ',
            (cat) => {
              const resultados = filtrarProdutosPorCategoria(cat.trim());
              console.log('\n--- PRODUTOS DA CATEGORIA ---', resultados);
              pausarEContinuar();
            },
          );
          return;
        case '8': // Atualizar Produto
          rl.question(
            '\nDigite o ID do produto que deseja atualizar: ',
            (id) => {
              rl.question(
                'Novo preço (deixe em branco para não alterar): ',
                (precoStr) => {
                  rl.question(
                    'Novo estoque (deixe em branco para não alterar): ',
                    (estoqueStr) => {
                      try {
                        const dadosAtualizados: any = {};
                        if (precoStr.trim() !== '')
                          dadosAtualizados.preco = parseFloat(precoStr);
                        if (estoqueStr.trim() !== '')
                          dadosAtualizados.estoque = parseInt(estoqueStr);

                        atualizarProduto(id.trim(), dadosAtualizados);
                        console.log('\nProduto atualizado com sucesso!');
                      } catch (e: any) {
                        console.log('\nErro ao atualizar:', e.message);
                      }
                      pausarEContinuar();
                    },
                  );
                },
              );
            },
          );
          return;
        case '9': // Pedidos
          console.log('\n--- PEDIDOS REGISTRADOS ---', listarPedidos());
          pausarEContinuar();
          break;
        case '10': // Relatórios
          console.log('\n--- RELATÓRIOS ---');
          console.log('Vendas Totais:', relatorioVendasTotais());
          console.log('Estoque Baixo:', relatorioEstoqueBaixo());
          pausarEContinuar();
          break;
        case '11': // Carrinho
          estado = 'carrinho';
          loopMenu();
          break;
        case '0':
          console.log('A encerrar o sistema...');
          rl.close();
          process.exit(0);
        default:
          console.log('Opção inválida!');
          pausarEContinuar();
          break;
      }
    } else if (estado === 'carrinho') {
      switch (opcao) {
        case '1': // Adicionar produto
          rl.question(
            '\nDigite o ID do produto (ex: p1, p2, p3): ',
            (prodId) => {
              rl.question('Digite a quantidade desejada: ', (qtdStr) => {
                try {
                  const quantidade = parseInt(qtdStr);
                  adicionarAoCarrinho(prodId.trim(), quantidade);
                  console.log('\nProduto adicionado ao carrinho com sucesso!');
                } catch (e: any) {
                  console.log('\nErro:', e.message);
                }
                pausarEContinuar();
              });
            },
          );
          return;
        case '2': // Remover produto
          rl.question(
            '\nDigite o ID do produto a remover do carrinho: ',
            (prodId) => {
              try {
                removerDoCarrinho(prodId.trim());
                console.log('\nProduto removido do carrinho com sucesso!');
              } catch (e: any) {
                console.log('\nErro:', e.message);
              }
              pausarEContinuar();
            },
          );
          return;
        case '3': // Alterar quantidade
          rl.question(
            '\nDigite o ID do produto cuja quantidade deseja alterar: ',
            (prodId) => {
              rl.question('Digite a nova quantidade: ', (qtdStr) => {
                try {
                  const novaQtd = parseInt(qtdStr);
                  alterarQuantidadeCarrinho(prodId.trim(), novaQtd);
                  console.log('\nQuantidade alterada com sucesso!');
                } catch (e: any) {
                  console.log('\nErro:', e.message);
                }
                pausarEContinuar();
              });
            },
          );
          return;
        case '4': // Listar carrinho
          console.log('\n--- ITENS NO CARRINHO ---', listarCarrinho());
          pausarEContinuar();
          break;
        case '5': // Calcular total
          console.log(
            `\nValor Total da Compra: R$ ${calcularTotalCarrinho().toFixed(2)}`,
          );
          pausarEContinuar();
          break;
        case '6': // Finalizar pedido
          rl.question(
            '\nDigite o ID do cliente que está a realizar a compra (ex: c1): ',
            (clienteId) => {
              try {
                const pedidoGerado = finalizarPedido(clienteId.trim());
                console.log('\nPedido gerado com sucesso!');
                console.log('Detalhes do Pedido:', pedidoGerado);
              } catch (e: any) {
                console.log('\nErro ao finalizar pedido:', e.message);
              }
              pausarEContinuar();
            },
          );
          return;
        case '0': // Voltar
          estado = 'principal';
          loopMenu();
          break;
        default:
          console.log('Opção inválida!');
          pausarEContinuar();
          break;
      }
    }
  });
}

function pausarEContinuar() {
  rl.question('\nPressione ENTER para continuar...', () => {
    loopMenu();
  });
}

loopMenu();
