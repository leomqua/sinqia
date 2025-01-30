using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Prova.Models
{
    public class PontosTuristicos
    {
        [Key]
        public int Id {get;set;}

        [Required]
        public string Nome {get;set;}

        [StringLength(100)]
        public string Descricao{get;set;}

        [Required]
        public string Localizacao{get;set;}

        [Required]
        public string Estado { get; set; } 

        [Required]
        public string Cidade { get; set; } 
    }
}