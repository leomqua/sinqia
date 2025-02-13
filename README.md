📍 Pontos Turísticos

📋 Sobre o Projeto:  
Este é um sistema para o cadastro, listagem, atualização e exclusão de pontos turísticos. Ele permite:

- Cadastrar novos pontos turísticos.
- Listar todos os pontos turísticos cadastrados.
- Buscar por nome, descrição, cidade ou estado.
- Atualizar as informações de um ponto turístico.
- Excluir pontos turísticos.

Tecnologias Utilizadas
- ASP.NET Core 8.0 - Backend
- Entity Framework Core - Gerenciamento do banco de dados
- SQL Server - Banco de dados
- Bootstrap 5 - Estilização
- JavaScript - Lógica no frontend

Como Configurar o Projeto:  
1️⃣ Pré-requisitos  
Antes de começar, você precisa ter os seguintes itens instalados:

- .NET SDK 8.0: Baixar .NET
- SQL Server: Baixar SQL Server
- Um editor de código (ex: Visual Studio Code ou Visual Studio)

2️⃣ Clonar o Repositório  
No terminal, execute os seguintes comandos:  
git clone https://github.com/leomqua/sinqia.git

3️⃣ Configurar o Banco de Dados  
1. Abra o arquivo appsettings.json na raiz do projeto.  
2. Edite a string de conexão para apontar para o seu servidor SQL. Exemplo:  
**"ConnectionStrings": {**  
   ** "ConexaoPadrao": "Server=localhost;Database=PontosTuristicos;Trusted_Connection=True;TrustServerCertificate=True;"**  
**}**

4️⃣ Criar o Banco de Dados  
No terminal, aplique as migrações para criar o banco de dados:   
 **dotnet ef migrations add Inicial**    
 **dotnet ef database update**    
Caso o Entity Framework CLI não esteja instalado, use o comando abaixo para instalá-lo:  
**dotnet tool install --global dotnet-ef**  

5️⃣ Executar o Projeto  
Para iniciar o projeto, execute o comando abaixo:  
**dotnet run**

6️⃣ Acessar a Aplicação  
Após iniciar o projeto com dotnet run, abra o navegador e acesse a aplicação pelo endereço informado no terminal. Geralmente, o endereço segue este formato:  

- **http://localhost:5000/pages/index.html**  

O número da porta **(5000)** pode variar dependendo da configuração do ambiente. Caso seja diferente, utilize o endereço exibido no terminal ao iniciar a aplicação.
