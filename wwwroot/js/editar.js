document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const nome = urlParams.get('nome'); 

    if (nome) {
        fetch(`/api/PontosTuristicos/${nome}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('nome').value = data[0].nome;
                document.getElementById('descricao').value = data[0].descricao;
                document.getElementById('localizacao').value = data[0].localizacao;
                document.getElementById('cidade').value = data[0].cidade;
                document.getElementById('estado').value = data[0].estado;
            })
            .catch(error => {
                console.error('Erro ao carregar ponto turístico para edição:', error);
                alert('Erro ao carregar os dados.');
            });
    }
});

function salvarEdicao(event) {
    event.preventDefault(); 

    const nomeOriginal = new URLSearchParams(window.location.search).get('nome'); 
    const pontoAtualizado = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        localizacao: document.getElementById('localizacao').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    fetch(`/api/PontosTuristicos/${nomeOriginal}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pontoAtualizado)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao atualizar o ponto turístico.");
            }
            alert("Ponto turístico atualizado com sucesso!");
            window.location.href = "index.html"; 
        })
        .catch(error => {
            console.error('Erro ao atualizar ponto turístico:', error);
            alert("Erro ao atualizar os dados.");
        });
}

function voltar() {
    window.location.href = "index.html"; 
}
