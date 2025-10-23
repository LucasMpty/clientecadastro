const API_URL = 'https://crudcrud.com/api/63aa9cf8407c476d80b4662d89feb59a/clientes';

const form = document.getElementById("formClientes");
const lista = document.getElementById("listaClientes");

// carregar clientes quando abrir a página
window.addEventListener("DOMContentLoaded", carregarClientes);

// cadastrar cliente
form.addEventListener("submit", async function(evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !email) {
    alert("Preencha todos os campos!");
    return;
  }

  const cliente = { nome, email };

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
