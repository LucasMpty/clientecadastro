export const criarElemento = (tag, texto, classe) => {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;
    return elemento;
};

export const validarCampos = (nome, email) => nome.trim() !== "" && email.trim() !== "";

export const formatarCliente = cliente => `${cliente.nome} - ${cliente.email}`;