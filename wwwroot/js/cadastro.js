document.addEventListener("DOMContentLoaded", function () {
    carregarEstados();
    configurarFormulario();
});

function carregarEstados() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => response.json())
        .then(data => {
            const estadoSelect = document.getElementById("estado");
            data.sort((a, b) => a.nome.localeCompare(b.nome)); 

            data.forEach(estado => {
                const option = document.createElement("option");
                option.value = estado.sigla;
                option.textContent = estado.nome;
                estadoSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Erro ao carregar estados:", error));
}

function carregarCidades(siglaEstado) {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios`)
        .then(response => response.json())
        .then(data => {
            const cidadeSelect = document.getElementById("cidade");
            cidadeSelect.innerHTML = ""; 

            data.sort((a, b) => a.nome.localeCompare(b.nome)); 
            data.forEach(cidade => {
                const option = document.createElement("option");
                option.value = cidade.nome;
                option.textContent = cidade.nome;
                cidadeSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Erro ao carregar cidades:", error));
}

function configurarFormulario() {
    const estadoSelect = document.getElementById("estado");
    const formCadastro = document.getElementById("formCadastro");

    estadoSelect.addEventListener("change", function () {
        const siglaEstado = estadoSelect.value;
        if (siglaEstado) {
            carregarCidades(siglaEstado);
        } else {
            const cidadeSelect = document.getElementById("cidade");
            cidadeSelect.innerHTML = '<option value="">Selecione um estado primeiro</option>';
        }
    });

    formCadastro.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const localizacao = document.getElementById("localizacao").value;
        const estado = document.getElementById("estado").value;
        const cidade = document.getElementById("cidade").value;

        fetch('/api/PontosTuristicos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, descricao, localizacao, estado, cidade })
        })
            .then(response => {
                if (response.ok) {
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = "index.html";
                } else {
                    alert("Erro ao cadastrar ponto turístico.");
                }
            })
            .catch(error => console.error("Erro ao cadastrar:", error));
    });
}
