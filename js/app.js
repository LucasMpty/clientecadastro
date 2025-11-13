//importar classes
import {Cliente, ClienteService} from './classes.js';
import {criarElemento, validarCampos, formatarCliente} from './utils.js';

// endereço da API do CrudCrud
const API_URL = 'https://crudcrud.com/api/ddcf2381ecbb41ca85dd5ad3feef7623/clientes';


// variavel para o formulário e a lista ( pegando infos do HTML ) ul sendo usada como lista
const form = document.getElementById("formClientes");
const lista = document.getElementById("listaClientes");


const service = new ClienteService(API_URL);

// carregar clientes quando abrir a página com o DOMContentLoaded faz com que a pagina seja totalmente carregada antes de executar a função, no caso carregarClientes
document.addEventListener("DOMContentLoaded", carregarClientes);

// cadastrar cliente usando um evento de submit no formulário
form.addEventListener("submit", async function(evento) {
  evento.preventDefault(); // evitar o comportamento padrão do formulário de recarregar a página

  //pegar valores dos campos do formulário usando trim para remover espaços em branco
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  // validação simples para garantir que os campos não estejam vazios
  if (!validarCampos(nome, email)) {
    alert("Preencha todos os campos!");
    return;
  }

  // criando uma variável cliente com os dados do formulário
  const cliente = { nome, email };

  // try tenta executar o código, se der erro cai no catch
  // aqui cria uma varavel resposta que espera a resposta da API ao fazer o fetch com método POST (enviando dados)
  // o body envia os dados do cliente em formato JSON
try {
        await service.criar(cliente);
        form.reset();
        carregarClientes();
    } catch (erro) {
        console.error(erro);
    }
});

async function carregarClientes() {
    lista.innerHTML = "<li>Carregando...</li>";

    try {
        const clientes = await service.listar();
        lista.innerHTML = "";

        // usando programação funcional (map)
        clientes.map(cliente => {
            const li = criarElemento("li", formatarCliente(cliente));

            const botao = criarElemento("button", "Excluir");

            botao.addEventListener("click", async () => {
                try {
                    await service.excluir(cliente._id);
                    li.remove();
                } catch (err) {
                    console.error(err);
                }
            });

            li.appendChild(botao);
            lista.appendChild(li);
        });

    } catch (erro) {
        lista.innerHTML = "<li>Erro ao carregar clientes</li>";
        console.error(erro);
    }
}