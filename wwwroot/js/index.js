document.addEventListener("DOMContentLoaded", function () {
    carregarPontosTuristicos();
});

function carregarPontosTuristicos() {
    fetch('/api/PontosTuristicos')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = ""; // Limpa os dados antigos

            data.forEach(ponto => {
                const row = `
                    <tr>
                        <td>${ponto.nome}</td>
                        <td>${ponto.localizacao}</td>
                        <td>${ponto.cidade}</td>
                        <td>${ponto.estado}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="apagarPonto(${ponto.id})">X</button>
                        </td>
                    </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Erro ao carregar pontos turísticos:', error));
}


function filtrar() {
    const termo = document.getElementById("searchBox").value.toLowerCase();

    // Faz a requisição para o endpoint de busca pelo nome
    fetch(`/api/PontosTuristicos/${termo}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    // Exibe uma mensagem caso nenhum resultado seja encontrado
                    const tableBody = document.getElementById("tableBody");
                    tableBody.innerHTML = `<tr><td colspan="4" class="text-center">Nenhum ponto turístico encontrado com esse nome</td></tr>`;
                    return null;
                }
                throw new Error(`Erro na busca: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data) return; // Se nenhum resultado foi encontrado, sai da função

            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = ""; // Limpa os resultados anteriores

            // Adiciona os novos resultados na tabela
            data.forEach(ponto => {
                const row = `<tr>
                    <td>${ponto.nome}</td>
                    <td>${ponto.localizacao}</td>
                    <td>${ponto.cidade}</td>
                    <td>${ponto.estado}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Erro ao buscar pontos turísticos:', error);
            alert('Erro ao buscar os dados. Verifique a API.');
        });
}

function apagarPonto(id) {
    if (confirm("Tem certeza de que deseja excluir este ponto turístico?")) {
        fetch(`/api/PontosTuristicos/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao excluir o ponto turístico.");
                }
                alert("Ponto turístico excluído com sucesso!");
                carregarPontosTuristicos(); // Recarrega a lista após exclusão
            })
            .catch(error => {
                console.error('Erro ao excluir ponto turístico:', error);
                alert("Erro ao excluir o ponto turístico.");
            });
    }
}

