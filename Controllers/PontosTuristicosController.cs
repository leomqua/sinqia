using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Prova.Context;
using Prova.Models;

namespace Prova.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Define a rota base como /api/PontosTuristicos
    public class PontosTuristicosController : ControllerBase
    {
        private readonly OrganizadorContext _context;

        public PontosTuristicosController(OrganizadorContext context)
        {
            _context = context;
        }

        // Cadastro de ponto turístico
        [HttpPost]
        public IActionResult Cadastrar([FromBody] PontosTuristicos pontos)
        {
            if (pontos == null)
            {
                return BadRequest("Os dados enviados são inválidos.");
            }

            _context.PontosTuristicos.Add(pontos);
            _context.SaveChanges();
            return Ok(pontos);
        }

        // Remover ponto turístico pelo nome
        [HttpDelete("{nome}")]
        public IActionResult RemoverCadastro(string nome)
        {
            var acharCadastro = _context.PontosTuristicos.FirstOrDefault(x => x.Nome == nome);
            if (acharCadastro == null)
            {
                return NotFound("Ponto turístico não encontrado.");
            }

            _context.PontosTuristicos.Remove(acharCadastro);
            _context.SaveChanges();
            return NoContent();
        }

        // Buscar um ponto turístico pelo nome
        [HttpGet("{nome}")]
        public IActionResult AcharCadastro(string nome)
        {
            var acharCadastro = _context.PontosTuristicos.Where(x => x.Nome.Contains(nome)).ToList();
            if (!acharCadastro.Any())
            {
                return NotFound("Nenhum ponto turístico encontrado com esse nome.");
            }

            return Ok(acharCadastro);
        }

        // Listar todos os pontos turísticos
    [HttpGet]
    public IActionResult AcharTodos()
    {
        try
        {
            var acharTodos = _context.PontosTuristicos.OrderByDescending(x => x.Id).ToList();
        
            // Log para verificar se a consulta retornou registros
            Console.WriteLine($"Total de registros encontrados: {acharTodos.Count}");

            if (!acharTodos.Any())
            {
                return NoContent(); // Retorna 204 se não houver registros
            }

            return Ok(acharTodos); // Retorna os dados
        }
        catch (Exception ex)
        {
            // Log do erro
            Console.WriteLine($"Erro ao buscar pontos turísticos: {ex.Message}");
            return StatusCode(500, "Erro interno no servidor.");
    }
}


        // Atualizar um ponto turístico pelo nome
        [HttpPut("{nome}")]
        public IActionResult AtualizarCadastro(string nome, [FromBody] PontosTuristicos pontos)
        {
            var acharCadastro = _context.PontosTuristicos.FirstOrDefault(x => x.Nome == nome);
            if (acharCadastro == null)
            {
                return NotFound("Ponto turístico não encontrado.");
            }

            acharCadastro.Nome = pontos.Nome;
            acharCadastro.Descricao = pontos.Descricao;
            acharCadastro.Localizacao = pontos.Localizacao;
            acharCadastro.Cidade = pontos.Cidade;
            acharCadastro.Estado = pontos.Estado;

            _context.SaveChanges();
            return Ok(acharCadastro);
        }
    }
}
