// endereço da API do CrudCrud
const API_URL = 'https://crudcrud.com/api/63aa9cf8407c476d80b4662d89feb59a/clientes';


// variavel para o formulário e a lista ( pegando infos do HTML ) ul sendo usada como lista
const form = document.getElementById("formClientes");
const lista = document.getElementById("listaClientes");


// carregar clientes quando abrir a página com o DOMContentLoaded faz com que a pagina seja totalmente carregada antes de executar a função, no caso carregarClientes
window.addEventListener("DOMContentLoaded", carregarClientes);

// cadastrar cliente usando um evento de submit no formulário
form.addEventListener("submit", async function(evento) {
  evento.preventDefault(); // evitar o comportamento padrão do formulário de recarregar a página

  //pegar valores dos campos do formulário usando trim para remover espaços em branco
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  // validação simples para garantir que os campos não estejam vazios
  if (!nome || !email) {
    alert("Preencha todos os campos!");
    return;
  }

  // criando uma variável cliente com os dados do formulário
  const cliente = { nome, email };

  // try tenta executar o código, se der erro cai no catch
  // aqui cria uma varavel resposta que espera a resposta da API ao fazer o fetch com método POST (enviando dados)
  // o body envia os dados do cliente em formato JSON
  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });

    if (!resposta.ok) throw new Error("Erro ao cadastrar cliente");

    form.reset();
    carregarClientes();
  } catch (erro) {
    console.error("Erro:", erro);
  }
});

// excluir cliente
async function excluirCliente(id, botao) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao excluir cliente");

    // remove o <li> da tela
    botao.parentElement.remove();
  } catch (err) {
    console.error("Erro de rede ao remover cliente:", err);
  }
}

// buscar e mostrar clientes
async function carregarClientes() {
  lista.innerHTML = "<li>Carregando...</li>";

  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error("Erro ao buscar clientes");

    const clientes = await resposta.json();
    lista.innerHTML = "";

    clientes.forEach((cliente) => {
      const li = document.createElement("li");
      li.textContent = `${cliente.nome} - ${cliente.email} `;

      const botaoExcluir = document.createElement("button");
      botaoExcluir.textContent = "Excluir";

      // passa o botão clicado pra função
      botaoExcluir.addEventListener("click", (evento) => excluirCliente(cliente._id, evento.target));

      li.appendChild(botaoExcluir);
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar clientes:", erro);
    lista.innerHTML = "<li>Erro ao carregar clientes</li>";
  }
}
