export class Cliente {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

export class ClienteService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl; // AGORA FUNCIONA
    }

    async listar() {
        const res = await fetch(this.apiUrl);

        if (!res.ok) throw new Error("Erro ao buscar clientes");

        return res.json(); // CORRIGIDO
    }

    async criar(cliente) {
        const res = await fetch(this.apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente),
        });

        if (!res.ok) throw new Error("Erro ao cadastrar cliente");

        return res.json();
    }

    async excluir(id) {
        const res = await fetch(`${this.apiUrl}/${id}`, { 
            method: "DELETE" 
        });

        if (!res.ok) throw new Error("Erro ao excluir cliente");
    }
}
