document.addEventListener("DOMContentLoaded", function () {
    carregarPontosTuristicos();
});

function carregarPontosTuristicos() {
    fetch('/api/PontosTuristicos')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = ""; 

            data.forEach(ponto => {
                const row = `
                    <tr>
                        <td>${ponto.nome}</td>
                        <td>${ponto.localizacao}</td>
                        <td>${ponto.cidade}</td>
                        <td>${ponto.estado}</td>
                        <td>
                            <!-- Botão de edição com ícone de lápis -->
                            <button class="btn btn-warning btn-sm" onclick="redirecionarParaEdicao('${ponto.nome}')">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </td>
                        <td>
                            <!-- Botão de remoção com ícone de X -->
                            <button class="btn btn-danger btn-sm" onclick="apagarPonto(${ponto.id})">
                                <i class="bi bi-x"></i>
                            </button>
                        </td>
                    </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Erro ao carregar pontos turísticos:', error));
}




function filtrar() {
    const termo = document.getElementById("searchBox").value.toLowerCase();

    fetch(`/api/PontosTuristicos/${termo}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {

                    const tableBody = document.getElementById("tableBody");
                    tableBody.innerHTML = `<tr><td colspan="4" class="text-center">Nenhum ponto turístico encontrado com esse nome</td></tr>`;
                    return null;
                }
                throw new Error(`Erro na busca: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data) return; 

            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = ""; 

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
                carregarPontosTuristicos(); 
            })
            .catch(error => {
                console.error('Erro ao excluir ponto turístico:', error);
                alert("Erro ao excluir o ponto turístico.");
            });
    }
}


function redirecionarParaEdicao(nome) {
    window.location.href = `editar.html?nome=${encodeURIComponent(nome)}`;
}
