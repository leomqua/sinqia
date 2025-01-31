using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Prova.Context;
using Prova.Models;

namespace Prova.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PontosTuristicosController : ControllerBase
    {
        private readonly OrganizadorContext _context;

        public PontosTuristicosController(OrganizadorContext context)
        {
            _context = context;
        }

        
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

        
        [HttpDelete("{id}")]
        public IActionResult RemoverCadastro(int id)
        {
            var acharCadastro = _context.PontosTuristicos.FirstOrDefault(x => x.Id == id);
            if (acharCadastro == null)
            {
                return NotFound("Ponto turístico não encontrado.");
            }

            _context.PontosTuristicos.Remove(acharCadastro);
            _context.SaveChanges();
            return NoContent();
        }


        [HttpGet("{termo}")]
        public IActionResult AcharCadastro(string termo)
        {
            termo = termo.ToLower(); 

            var acharCadastro = _context.PontosTuristicos
                .Where(x => x.Nome.ToLower().Contains(termo) || x.Cidade.ToLower().Contains(termo)) 
                .ToList();

            if (!acharCadastro.Any())
            {
                return NotFound("Nenhum ponto turístico encontrado.");
            }

            return Ok(acharCadastro);
        }


        
        [HttpGet]
        public IActionResult AcharTodos()
        {
            try
            {
                var acharTodos = _context.PontosTuristicos.OrderByDescending(x => x.Id).ToList();
        
                Console.WriteLine($"Total de registros encontrados: {acharTodos.Count}");

                if (!acharTodos.Any())
                {
                    return NoContent();
                }

                return Ok(acharTodos);
            }
            catch (Exception ex)
            {
        
                Console.WriteLine($"Erro ao buscar pontos turísticos: {ex.Message}");
                return StatusCode(500, "Erro interno no servidor.");
            }
        }


        
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
